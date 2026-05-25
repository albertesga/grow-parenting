import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paper canvas · DS canon
        paper: '#FAF7F0',
        'paper-soft': '#F2EDE0',
        'paper-deep': '#E8E1CF',
        // Ink hierarchy · DS canon
        ink: '#1A1A1A',
        'ink-warm': '#2A211B',
        'ink-soft': '#4D4D4D',
        'ink-muted': '#888888',
        'ink-faint': '#BFBAA8',
        line: '#E2DDD1',
        'line-strong': '#C9C2B2',
        // Coral · embarazo, alimentación, cólicos
        'coral-subtle': '#FBE5D6',
        'coral-base': '#F2A57A',
        'coral-strong': '#D67742',
        'coral-ink': '#8E4A22',
        // Blush · lactancia, diario
        'blush-subtle': '#F8E4DD',
        'blush-base': '#EFC2B5',
        'blush-strong': '#D89A89',
        'blush-ink': '#7A3D2D',
        // Mint · hitos, sueño, perfil, default
        'mint-subtle': '#E5EDDF',
        'mint-base': '#BFD2B0',
        'mint-strong': '#8FAE85',
        'mint-ink': '#4E6A45',
        'mint-soft': '#C8D8B8',
        // Gold · vacunas
        'gold-subtle': '#F6EBC9',
        'gold-base': '#E8C97A',
        'gold-strong': '#B8973F',
        'gold-ink': '#6E5A2A',
        // Violet · desarrollo
        'violet-subtle': '#E6DFE9',
        'violet-strong': '#6A5A7E',
        'violet-ink': '#4A3D55',
      },
      fontFamily: {
        // DS canon May 2026 · Galiner display + Inter body
        serif: ['Galiner', 'Bodoni Moda', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Galiner', 'Bodoni Moda', 'Playfair Display', 'Georgia', 'serif'],
        text: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Sans default · Inter (alineado con DS canon · ex-Grift)
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Grift · legacy · solo accesible vía font-grift class si surge
        // caso puntual · no usar en código nuevo
        grift: ['Grift', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'emph': 'cubic-bezier(0.34, 1.1, 0.4, 1)',
        'sheet': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
