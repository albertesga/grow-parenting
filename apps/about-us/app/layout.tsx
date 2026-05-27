import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grow · Este es Inti',
  description:
    'Una historia íntima sobre Inti · un niño feliz, sensible y tranquilo de 7 años que vive en Barcelona con su hermana y sus padres.',
};

export const viewport: Viewport = {
  themeColor: '#FAF7F0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-grift text-ink antialiased">{children}</body>
    </html>
  );
}
