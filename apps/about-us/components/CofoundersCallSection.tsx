'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * CofoundersCallSection · cierre real de la página about-us.
 *
 * Viene DESPUÉS de NarrativeClosingSection · recoge el peso emocional del
 * closing ("...la mayor oportunidad de ayudar a otras familias") y lo
 * convierte en una convocatoria concreta: buscamos 4-6 cofundadores para
 * 3-6 meses de validación. 6 perfiles en cards tonales + cómo trabajamos +
 * filtro mínimo + CTA mailto.
 *
 * Scroll normal (no sticky, no fill-on-scroll word-by-word · esta sección
 * informa y convoca, no construye tensión emocional). Entrada sutil por
 * bloque vía whileInView (gateado por prefers-reduced-motion).
 *
 * Tono serio-cálido · sin "vacante"/"puesto" · sin salario/equity concreto ·
 * sin urgencia falsa · sin emojis · solo tokens DS existentes.
 */

const EMAIL = 'hola@growbythechildlens.com';

interface Profile {
  num: string;
  /** clases tailwind del DS · franja accent + número/acento tinta */
  bar: string;
  ink: string;
  role: string;
  blurb: string;
  bullets: string[];
  /** línea de cierre opcional por perfil (suma puntos / matiz) */
  note?: string;
}

const PROFILES: Profile[] = [
  {
    num: '01',
    bar: 'bg-gold-base',
    ink: 'text-gold-ink',
    role: 'CTO cofundador',
    blurb: 'Lidera ingeniería y co-decide la dirección técnica.',
    bullets: [
      '10+ años construyendo productos digitales desde cero',
      'Full-stack, infra propia, datos',
      'AI-native real (Cursor, Claude Code, evals, agentes)',
      'Decisiones de arquitectura sin sobre-ingeniería en validación',
      'Ganas de construir con las manos, no de managear todavía',
      'Criterio de privacy / GDPR / datos sensibles',
    ],
    note: 'Suma puntos · experiencia en salud digital, ex-fundador, scaling pequeño→mediano.',
  },
  {
    num: '02',
    bar: 'bg-blush-base',
    ink: 'text-blush-ink',
    role: 'Medical Advisor cofundador',
    blurb: 'Construye con nosotros la dimensión clínica del producto.',
    bullets: [
      'Formación en medicina, enfermería pediátrica, matronería, psicología perinatal o área afín',
      'Revisa contenido, escalas y citas con criterio clínico',
      'Hace llamadas reales con usuarios en validación',
      'Entiende la línea entre "información" y "consejo médico"',
      'Curiosidad por software que acompaña — sin sustituir — al SNS',
    ],
    note: 'No queremos un asesor que firme un PDF. Queremos a alguien dentro del equipo fundador.',
  },
  {
    num: '03',
    bar: 'bg-coral-base',
    ink: 'text-coral-ink',
    role: 'GTM / Growth orgánico y guerrilla',
    blurb: 'Crece sin presupuesto en la primera fase.',
    bullets: [
      'Validación de canales desde cero',
      'Contenido rápido, narrativa, comunidad',
      'Growth creativo y experimentos baratos',
      'Combina orgánico + community + cultura digital',
      'AI-native, maker, rápido ejecutando',
      'Orientado a validación real, no vanity metrics',
    ],
    note: 'Más adelante abriremos paid + performance. Ahora toca orgánico.',
  },
  {
    num: '04',
    bar: 'bg-violet-strong',
    ink: 'text-violet-ink',
    role: 'Senior Product Designer · Brand & Motion',
    blurb: 'Diseña producto, marca y motion.',
    bullets: [
      'Muy buen gusto visual y obsesión por detalle',
      'Experiencias web/app modernas',
      'Identidad visual + narrativa de marca',
      'Motion skills',
      'Research humano y sintético',
      'Sensibilidad emocional y estética',
    ],
    note: 'Idealmente · 10+ años, startups, sensibilidad por bienestar / familia / psicología / comportamiento humano.',
  },
  {
    num: '05',
    bar: 'bg-mint-base',
    ink: 'text-mint-ink',
    role: 'Junior Content & Research',
    blurb: 'Perfil curioso, AI-native, ganas de aprender rápido.',
    bullets: [
      'Interés por psicología, crianza o comportamiento humano',
      'Investigación y síntesis',
      'Buen gusto + sensibilidad por contenido',
      'Herramientas IA fluido',
    ],
    note: 'Ayuda en · research · entrevistas · contenido · benchmark · prompts · tendencias · community · social.',
  },
  {
    num: '06',
    bar: 'bg-sky-strong',
    ink: 'text-sky-ink',
    role: 'Junior Builder · Design + Dev',
    blurb: 'Perfil híbrido moderno, prototipado rápido.',
    bullets: ['Figma + Framer', 'Cursor / Claude / AI tools', 'Motion + web experiments'],
    note: 'Más importante velocidad, curiosidad y sensibilidad de producto que el CV.',
  },
];

const VALUES: { title: string; line: string }[] = [
  { title: 'Sano', line: 'Sin política, sin egos, sin cultura tóxica de hustle.' },
  { title: 'Honesto', line: 'Feedback directo, ownership real, iteración rápida.' },
  { title: 'Ambicioso', line: 'Construimos para impacto real, no para postureo startup.' },
];

export default function CofoundersCallSection() {
  const reduce = useReducedMotion();

  // Helper · props de entrada whileInView gateados por reduced-motion.
  // Si el user prefiere reduced-motion, devolvemos estado final estático.
  const enter = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-10%' },
          transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const, delay },
        };

  // Variants para stagger de las cards de perfil
  const gridParent: Variants = reduce
    ? {}
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      };
  const gridChild: Variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
      };

  return (
    <section
      className="relative w-full bg-paper"
      aria-label="Buscamos cofundadores para construir Grow"
    >
      <div className="mx-auto max-w-[1100px] px-6 py-28 md:px-10 md:py-36 lg:px-16">
        {/* 1 · Eyebrow */}
        <motion.p
          {...enter()}
          className="font-text text-[12px] font-medium uppercase text-ink-soft"
          style={{ letterSpacing: '0.2em' }}
        >
          Buscamos · Cofundadores · Mayo 2026
        </motion.p>

        {/* 2 · Título */}
        <motion.h2
          {...enter(0.04)}
          className="font-grift mt-6 max-w-[18ch] font-light leading-[1.04] tracking-tight text-ink"
          style={{ fontSize: 'clamp(34px, 5vw, 68px)', letterSpacing: '-0.015em' }}
        >
          Buscamos 4-6 personas para construir esto con nosotros.
        </motion.h2>

        {/* 3 · Lead · 2 párrafos */}
        <div className="mt-8 flex max-w-[58ch] flex-col gap-5">
          <motion.p
            {...enter(0.06)}
            className="font-text font-light leading-[1.5] text-ink-soft"
            style={{ fontSize: 'clamp(17px, 1.3vw, 22px)' }}
          >
            Estamos en una fase inicial de validación de 3-6 meses. Construiremos
            producto, hablaremos con usuarios reales, iteraremos rápido y
            descubriremos si aquí hay una compañía que merezca los próximos años
            de nuestra vida.
          </motion.p>
          <motion.p
            {...enter(0.1)}
            className="font-text font-light leading-[1.5] text-ink-soft"
            style={{ fontSize: 'clamp(17px, 1.3vw, 22px)' }}
          >
            No buscamos freelances ni un side project. Buscamos a las personas con
            las que queremos fundar esto. Pacto de socios desde el principio,
            expectativas claras, equity definido.
          </motion.p>
        </div>

        {/* 4 · Quiénes somos · 2 cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <FounderCard
            label="Producto"
            body="20+ años creando productos digitales desde cero. 10+ proyectos en compañías que han levantado 20M€+ en pre-seed/seed."
            anim={enter(0.04)}
          />
          <FounderCard
            label="Builder velocity"
            body="15+ años de software engineering en la base técnica actual. Prototipo vivo y capacidad de iterar rápido. La siguiente etapa pide un CTO cofundador que lidere de aquí en adelante."
            anim={enter(0.08)}
          />
        </div>

        {/* 5 · Los 6 perfiles */}
        <div className="mt-20">
          <motion.h3
            {...enter()}
            className="font-grift font-light leading-[1.1] tracking-tight text-ink"
            style={{ fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.012em' }}
          >
            Los perfiles que buscamos.
          </motion.h3>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridParent}
            initial={reduce ? undefined : 'hidden'}
            whileInView={reduce ? undefined : 'show'}
            viewport={{ once: true, margin: '-8%' }}
          >
            {PROFILES.map((p) => (
              <ProfileCard key={p.num} profile={p} variants={gridChild} />
            ))}
          </motion.div>
        </div>

        {/* 6 · Cómo trabajamos · 3 columnas */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-line pt-12 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} {...enter(i * 0.06)}>
              <h4 className="font-text text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">
                {v.title}
              </h4>
              <p className="mt-2 font-text text-[15px] font-light leading-[1.5] text-ink-soft">
                {v.line}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 7 · Filtro mínimo */}
        <motion.p
          {...enter()}
          className="mt-16 max-w-[60ch] font-text text-[clamp(16px,1.15vw,19px)] font-light leading-[1.55] text-ink-soft"
        >
          Esto probablemente no encaja contigo si buscas freelance corto,
          estructura corporativa, rol ultra definido desde el día 1 o cobrar
          antes de validar.
        </motion.p>

        {/* 8 · Compromiso real */}
        <motion.p
          {...enter(0.04)}
          className="mt-5 max-w-[60ch] font-text text-[14px] font-light leading-[1.55] text-ink-faint"
        >
          Durante la fase de validación: mínimo 10h/semana, 1 reunión semanal de
          1h, flexibilidad total, mayoritariamente async. En Barcelona o con
          intención real de estar aquí en una segunda fase.
        </motion.p>

        {/* 9 · CTA final */}
        <div className="mt-20 border-t border-line pt-16">
          <motion.h3
            {...enter()}
            className="font-grift font-light leading-[1.04] tracking-tight text-ink"
            style={{ fontSize: 'clamp(32px, 4.4vw, 60px)', letterSpacing: '-0.015em' }}
          >
            Cuéntanos quién eres.
          </motion.h3>
          <motion.p
            {...enter(0.05)}
            className="mt-5 max-w-[52ch] font-text text-[clamp(17px,1.25vw,21px)] font-light leading-[1.5] text-ink-soft"
          >
            Escríbenos a{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-ink underline decoration-mint-strong decoration-2 underline-offset-4"
            >
              {EMAIL}
            </a>{' '}
            con dos frases sobre ti y por qué te interesa esto. Te respondemos en
            menos de una semana.
          </motion.p>

          <motion.div {...enter(0.1)} className="mt-9">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-4 font-text text-[15px] font-medium text-paper transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-ink-warm sm:w-auto"
            >
              Escribir a {EMAIL}
            </a>
          </motion.div>

          <motion.p
            {...enter(0.14)}
            className="mt-6 font-text text-[13px] font-light leading-[1.5] text-ink-faint"
          >
            Sin formularios. Sin proceso. Solo una primera conversación honesta.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   FounderCard · mini-bloque "quiénes somos" (Producto · Builder velocity)
   ──────────────────────────────────────────────────────────────────── */

function FounderCard({
  label,
  body,
  anim,
}: {
  label: string;
  body: string;
  anim: Record<string, unknown>;
}) {
  return (
    <motion.div
      {...anim}
      className="rounded-[28px] border border-line bg-paper p-7 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong"
    >
      <p className="font-text text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </p>
      <p className="mt-3 font-text text-[15px] font-light leading-[1.55] text-ink">
        {body}
      </p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   ProfileCard · una de las 6 cards de perfil · franja accent tonal arriba
   ──────────────────────────────────────────────────────────────────── */

function ProfileCard({ profile, variants }: { profile: Profile; variants: Variants }) {
  const { num, bar, ink, role, blurb, bullets, note } = profile;
  return (
    <motion.div
      variants={variants}
      className="relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-paper p-7 pt-8 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong"
    >
      {/* Franja accent tonal · 3px arriba */}
      <span className={`absolute inset-x-0 top-0 h-[3px] ${bar}`} aria-hidden="true" />

      <span className={`font-text text-[13px] font-semibold tracking-[0.12em] ${ink}`}>
        {num}
      </span>
      <h4 className="mt-2 font-text text-[19px] font-bold leading-[1.2] text-ink">
        {role}
      </h4>
      <p className="mt-2 font-text text-[14.5px] font-light leading-[1.45] text-ink-soft">
        {blurb}
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-4 font-text text-[14px] font-light leading-[1.4] text-ink-soft"
          >
            <span
              className={`absolute left-0 top-[0.5em] h-1.5 w-1.5 rounded-full ${bar}`}
              aria-hidden="true"
            />
            {b}
          </li>
        ))}
      </ul>

      {note && (
        <p className="mt-4 border-t border-line pt-3 font-text text-[13px] font-light italic leading-[1.45] text-ink-faint">
          {note}
        </p>
      )}
    </motion.div>
  );
}
