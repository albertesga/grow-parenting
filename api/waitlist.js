const NOTION_BASE_URL = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const RATE_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_PER_WINDOW = 90;
const EVENT_DEDUPE_MS = 8000;
const CACHE_TTL_MS = 10 * 60 * 1000;

const rateCache = new Map();
const dedupeCache = new Map();
const dbSchemaCache = new Map();

const LEAD_FIELD_CANDIDATES = {
  title: ["Nombre", "Name", "Lead"],
  email: ["Email", "Correo", "Email principal"],
  rol: ["Rol cuidador", "Rol", "Caregiver role"],
  fechaTipo: ["Estado embarazo", "Tipo fecha", "Estado", "Pregnancy status"],
  fecha: ["Fecha hij@", "Fecha", "Child date"],
  problemas: ["Top 3 problemas", "Problemas", "Top problems"],
  intensidad: ["Intensidad problemas", "Intensidad", "Problem intensity"],
  features: ["Rating features", "Features rating", "Features"],
  precioSensacion: ["Sensación precio", "Precio sensación", "Price feel"],
  tier: ["Tier intent", "Tier", "Intención tier"],
  porque: ["Por qué precio", "Por qué", "Why"],
  gap: ["Gap competencia", "Gap", "Falta actual"],
  problemasComentario: ["Comentario problemas", "Problemas comentario"],
  featuresComentario: ["Comentario features", "Features comentario"],
  newsletter: ["Opt-in newsletter", "Newsletter", "Opt in"],
  utmSource: ["UTM source", "utm_source", "Source"],
  utmMedium: ["UTM medium", "utm_medium"],
  utmCampaign: ["UTM campaign", "utm_campaign"],
  sessionId: ["Session ID", "Session", "sessionId"],
  ultimoEvento: ["Último evento", "Ultimo evento", "Last event"],
  ultimoStep: ["Último step", "Ultimo step", "Last step"],
  payload: ["Payload", "JSON", "Raw payload"],
};

const EVENT_FIELD_CANDIDATES = {
  title: ["Nombre", "Name", "Event"],
  event: ["Evento", "Event"],
  sessionId: ["Session ID", "Session", "sessionId"],
  step: ["Step", "Paso"],
  action: ["Action", "Acción", "Accion"],
  email: ["Email", "Correo"],
  timestamp: ["Timestamp", "Fecha", "Date"],
  payload: ["Payload", "JSON", "Raw payload"],
};

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function nowIso() {
  return new Date().toISOString();
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function normalizeOrigin(origin) {
  if (!origin || typeof origin !== "string") return "";
  return origin.trim().replace(/\/+$/, "");
}

function getAllowedOrigins() {
  const env = process.env.WAITLIST_ALLOWED_ORIGINS || "";
  const fromEnv = env
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);
  return new Set(
    [
      "http://localhost:5050",
      "http://127.0.0.1:5050",
      "https://mimo.family",
      "https://www.mimo.family",
      ...fromEnv,
    ].filter(Boolean),
  );
}

function corsHeaders(origin) {
  const allowedOrigins = getAllowedOrigins();
  const normalized = normalizeOrigin(origin);
  const allowOrigin = allowedOrigins.has(normalized) ? normalized : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin || "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function pruneCaches() {
  const cutoff = Date.now() - CACHE_TTL_MS;
  for (const [key, entry] of rateCache.entries()) {
    if (entry.ts < cutoff) rateCache.delete(key);
  }
  for (const [key, entry] of dedupeCache.entries()) {
    if (entry.ts < cutoff) dedupeCache.delete(key);
  }
}

function checkRateLimit(sessionId, ip) {
  pruneCaches();
  const key = `${sessionId || "no-session"}:${ip || "no-ip"}`;
  const current = rateCache.get(key);
  const now = Date.now();
  if (!current || now - current.ts > RATE_WINDOW_MS) {
    rateCache.set(key, { ts: now, count: 1 });
    return { limited: false };
  }
  current.count += 1;
  current.ts = now;
  rateCache.set(key, current);
  if (current.count > RATE_LIMIT_PER_WINDOW) {
    return { limited: true };
  }
  return { limited: false };
}

function checkDuplicate(payload) {
  const base = [
    payload.sessionId || "",
    payload.event || "",
    String(payload.step ?? ""),
    payload.action || "",
    payload.reason || "",
  ].join("|");
  const now = Date.now();
  const current = dedupeCache.get(base);
  if (current && now - current.ts < EVENT_DEDUPE_MS) {
    return true;
  }
  dedupeCache.set(base, { ts: now });
  return false;
}

function parseJsonBody(req) {
  if (isObject(req.body)) return req.body;
  if (typeof req.body === "string" && req.body.trim().length > 0) {
    try {
      return JSON.parse(req.body);
    } catch (_error) {
      return null;
    }
  }
  return null;
}

function jsonResponse(res, status, data, extraHeaders = {}) {
  const headers = { "Content-Type": "application/json", ...extraHeaders };
  Object.entries(headers).forEach(([name, value]) => res.setHeader(name, value));
  res.status(status).send(JSON.stringify(data));
}

function isValidPayload(payload) {
  if (!isObject(payload)) return false;
  if (typeof payload.event !== "string" || payload.event.length === 0) return false;
  if (typeof payload.sessionId !== "string" || payload.sessionId.length === 0) return false;
  if (typeof payload.timestamp !== "string" || payload.timestamp.length === 0) return false;
  if (!isObject(payload.answers)) return false;
  if (!isObject(payload.source)) return false;
  if (payload.stepInfo != null && !isObject(payload.stepInfo)) return false;
  return true;
}

function truncateText(value, max = 1900) {
  const text = String(value == null ? "" : value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

async function notionFetch(path, token, options = {}) {
  const response = await fetch(`${NOTION_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await response.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch (_error) {
    parsed = { raw: text };
  }
  if (!response.ok) {
    const message = parsed?.message || `Notion error ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.details = parsed;
    throw err;
  }
  return parsed;
}

async function getDatabaseSchema(databaseId, token) {
  const cached = dbSchemaCache.get(databaseId);
  const now = Date.now();
  if (cached && now - cached.ts < 5 * 60 * 1000) return cached.schema;
  const schema = await notionFetch(`/databases/${databaseId}`, token);
  dbSchemaCache.set(databaseId, { ts: now, schema });
  return schema;
}

function resolveProperty(schema, candidates, allowedTypes = []) {
  if (!schema?.properties || !Array.isArray(candidates)) return null;
  const entries = Object.entries(schema.properties);
  for (const wanted of candidates) {
    const exact = entries.find(([name, meta]) => {
      if (name !== wanted) return false;
      if (!allowedTypes.length) return true;
      return allowedTypes.includes(meta.type);
    });
    if (exact) return { name: exact[0], meta: exact[1] };
  }
  for (const wanted of candidates) {
    const lowered = wanted.toLowerCase();
    const fuzzy = entries.find(([name, meta]) => {
      if (!name.toLowerCase().includes(lowered)) return false;
      if (!allowedTypes.length) return true;
      return allowedTypes.includes(meta.type);
    });
    if (fuzzy) return { name: fuzzy[0], meta: fuzzy[1] };
  }
  return null;
}

function setProperty(properties, resolved, value) {
  if (!resolved || value == null) return;
  const { name, meta } = resolved;
  if (meta.type === "title") {
    const content = truncateText(value, 1800).trim();
    if (!content) return;
    properties[name] = { title: [{ text: { content } }] };
    return;
  }
  if (meta.type === "rich_text") {
    const content = truncateText(value, 1800).trim();
    if (!content) return;
    properties[name] = { rich_text: [{ text: { content } }] };
    return;
  }
  if (meta.type === "email") {
    const email = String(value || "").trim();
    if (!email) return;
    properties[name] = { email };
    return;
  }
  if (meta.type === "checkbox") {
    properties[name] = { checkbox: Boolean(value) };
    return;
  }
  if (meta.type === "number") {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    properties[name] = { number: num };
    return;
  }
  if (meta.type === "date") {
    const date = String(value || "").trim();
    if (!date) return;
    properties[name] = { date: { start: date } };
    return;
  }
  if (meta.type === "select") {
    const nameValue = String(value || "").trim();
    if (!nameValue) return;
    properties[name] = { select: { name: truncateText(nameValue, 100) } };
    return;
  }
  if (meta.type === "multi_select") {
    const arr = Array.isArray(value) ? value : [];
    if (!arr.length) return;
    properties[name] = {
      multi_select: arr
        .map((item) => String(item || "").trim())
        .filter(Boolean)
        .slice(0, 20)
        .map((item) => ({ name: truncateText(item, 100) })),
    };
    return;
  }
  if (meta.type === "url") {
    const url = String(value || "").trim();
    if (!url) return;
    properties[name] = { url };
    return;
  }
}

function buildLeadProperties(schema, payload) {
  const props = {};
  const answers = payload.answers || {};
  const source = payload.source || {};
  const stepInfo = payload.stepInfo || {};
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.title, ["title"]), answers.nombre || "Lead waitlist");
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.email, ["email", "rich_text"]), answers.email);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.rol, ["select", "rich_text"]), answers.rol);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.fechaTipo, ["select", "rich_text"]), answers.fechaTipo);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.fecha, ["date", "rich_text"]), answers.fecha);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.problemas, ["multi_select", "rich_text"]), answers.problemas);
  setProperty(
    props,
    resolveProperty(schema, LEAD_FIELD_CANDIDATES.intensidad, ["rich_text"]),
    JSON.stringify(answers.intensidad || {}),
  );
  setProperty(
    props,
    resolveProperty(schema, LEAD_FIELD_CANDIDATES.features, ["rich_text"]),
    JSON.stringify(answers.features || {}),
  );
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.precioSensacion, ["select", "rich_text"]), answers.precio_sensacion);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.tier, ["select", "rich_text"]), answers.tier);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.porque, ["rich_text"]), answers.porque);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.gap, ["rich_text"]), answers.gap);
  setProperty(
    props,
    resolveProperty(schema, LEAD_FIELD_CANDIDATES.problemasComentario, ["rich_text"]),
    answers.problemas_comentario,
  );
  setProperty(
    props,
    resolveProperty(schema, LEAD_FIELD_CANDIDATES.featuresComentario, ["rich_text"]),
    answers.features_comentario,
  );
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.newsletter, ["checkbox"]), answers.newsletter !== false);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.utmSource, ["rich_text", "select"]), source?.utm?.utm_source || "");
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.utmMedium, ["rich_text", "select"]), source?.utm?.utm_medium || "");
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.utmCampaign, ["rich_text", "select"]), source?.utm?.utm_campaign || "");
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.sessionId, ["rich_text"]), payload.sessionId);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.ultimoEvento, ["rich_text", "select"]), payload.event);
  setProperty(props, resolveProperty(schema, LEAD_FIELD_CANDIDATES.ultimoStep, ["number", "rich_text"]), payload.step);
  setProperty(
    props,
    resolveProperty(schema, LEAD_FIELD_CANDIDATES.payload, ["rich_text"]),
    JSON.stringify({
      event: payload.event,
      action: payload.action || "",
      stepInfo,
      timestamp: payload.timestamp,
    }),
  );
  return props;
}

async function findLeadByEmail(databaseId, token, schema, email) {
  const emailProp = resolveProperty(schema, LEAD_FIELD_CANDIDATES.email, ["email"]);
  if (!emailProp || !email) return null;
  const query = await notionFetch(`/databases/${databaseId}/query`, token, {
    method: "POST",
    body: {
      page_size: 1,
      filter: {
        property: emailProp.name,
        email: { equals: email },
      },
    },
  });
  return query?.results?.[0] || null;
}

async function upsertLead(databaseId, token, payload) {
  const schema = await getDatabaseSchema(databaseId, token);
  const email = String(payload?.answers?.email || "").trim();
  const properties = buildLeadProperties(schema, payload);
  if (!Object.keys(properties).length) {
    return { ok: false, reason: "no-properties" };
  }
  const existing = await findLeadByEmail(databaseId, token, schema, email);
  if (existing?.id) {
    await notionFetch(`/pages/${existing.id}`, token, {
      method: "PATCH",
      body: { properties },
    });
    return { ok: true, mode: "update", pageId: existing.id };
  }
  const created = await notionFetch("/pages", token, {
    method: "POST",
    body: {
      parent: { database_id: databaseId },
      properties,
    },
  });
  return { ok: true, mode: "create", pageId: created.id };
}

function buildEventProperties(schema, payload) {
  const props = {};
  const title = `${payload.event} · ${payload.sessionId}`.slice(0, 120);
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.title, ["title"]), title);
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.event, ["select", "rich_text"]), payload.event);
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.sessionId, ["rich_text"]), payload.sessionId);
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.step, ["number", "rich_text"]), payload.step);
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.action, ["select", "rich_text"]), payload.action || "");
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.email, ["email", "rich_text"]), payload.answers?.email || "");
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.timestamp, ["date", "rich_text"]), payload.timestamp);
  setProperty(props, resolveProperty(schema, EVENT_FIELD_CANDIDATES.payload, ["rich_text"]), JSON.stringify(payload));
  return props;
}

async function createEventRecord(eventsDatabaseId, token, payload) {
  const schema = await getDatabaseSchema(eventsDatabaseId, token);
  const properties = buildEventProperties(schema, payload);
  if (!Object.keys(properties).length) {
    return { ok: false, reason: "no-properties" };
  }
  const created = await notionFetch("/pages", token, {
    method: "POST",
    body: {
      parent: { database_id: eventsDatabaseId },
      properties,
    },
  });
  return { ok: true, pageId: created.id };
}

async function handler(req, res) {
  const origin = req.headers.origin || "";
  const baseHeaders = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    Object.entries(baseHeaders).forEach(([name, value]) => res.setHeader(name, value));
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    jsonResponse(res, 405, { ok: false, error: "method-not-allowed" }, baseHeaders);
    return;
  }

  const payload = parseJsonBody(req);
  if (!isValidPayload(payload)) {
    jsonResponse(res, 400, { ok: false, error: "invalid-payload" }, baseHeaders);
    return;
  }

  payload.receivedAt = nowIso();
  const ip = getClientIp(req);
  const limited = checkRateLimit(payload.sessionId, ip);
  if (limited.limited) {
    jsonResponse(res, 429, { ok: false, error: "rate-limit" }, baseHeaders);
    return;
  }

  if (checkDuplicate(payload)) {
    jsonResponse(res, 202, { ok: true, duplicate: true }, baseHeaders);
    return;
  }

  const notionToken = process.env.NOTION_TOKEN || "";
  const leadsDatabaseId = process.env.NOTION_DATABASE_ID || "";
  const eventsDatabaseId = process.env.NOTION_EVENTS_DATABASE_ID || "";
  if (!notionToken || !leadsDatabaseId) {
    jsonResponse(
      res,
      500,
      { ok: false, error: "missing-env", required: ["NOTION_TOKEN", "NOTION_DATABASE_ID"] },
      baseHeaders,
    );
    return;
  }

  try {
    const shouldUpsertLead =
      payload.event !== "session_heartbeat" && String(payload?.answers?.email || "").trim().length > 3;
    let leadResult = null;
    if (shouldUpsertLead) {
      leadResult = await upsertLead(leadsDatabaseId, notionToken, payload);
    }

    let eventResult = null;
    if (eventsDatabaseId) {
      eventResult = await createEventRecord(eventsDatabaseId, notionToken, payload);
    }

    jsonResponse(
      res,
      200,
      {
        ok: true,
        accepted: true,
        lead: leadResult,
        event: eventResult,
      },
      baseHeaders,
    );
  } catch (error) {
    jsonResponse(
      res,
      500,
      {
        ok: false,
        error: "notion-error",
        message: error?.message || "unknown-error",
      },
      baseHeaders,
    );
  }
}

module.exports = handler;
