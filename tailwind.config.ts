import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'rick-green': '#87F54E',
        'space-dark': '#0A0B0D',
        'portal-blue': '#00C6FB',
        'morty-yellow': '#FFF200',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        stars: "url('/images/starts.png')",
      },
    },
  },
  plugins: [],
};
export default config;
