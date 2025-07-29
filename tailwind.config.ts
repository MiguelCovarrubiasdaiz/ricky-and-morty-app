import type { Config } from 'tailwindcss'

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
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'space': "radial-gradient(circle at 20% 50%, rgba(135, 245, 78, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 198, 251, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 242, 0, 0.03) 0%, transparent 50%)",
        'stars': "url('/images/starts.png')",
      },
    },
  },
  plugins: [],
}
export default config