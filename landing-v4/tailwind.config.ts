import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paper canvas
        paper: '#FAF7F0',
        'paper-soft': '#F2EDE0',
        'paper-deep': '#E8E1CF',
        // Ink hierarchy
        ink: '#1A1A1A',
        'ink-soft': '#4D4D4D',
        'ink-muted': '#888888',
        'ink-faint': '#BFBAA8',
        // Mint accent (logo bolita)
        'mint-soft': '#C8D8B8',
      },
      fontFamily: {
        // Grift como fuente principal · fallback a system-ui
        grift: ['Grift', 'system-ui', 'sans-serif'],
        sans: ['Grift', 'system-ui', 'sans-serif'],
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
