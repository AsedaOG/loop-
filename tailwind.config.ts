import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7f3',
          100: '#e8ede3',
          200: '#d4ddc9',
          300: '#b8c9a4',
          400: '#a4b894',
          500: '#8fa57d',
          600: '#7a8f68',
          700: '#657656',
          800: '#525d47',
          900: '#3d4536',
        },
      },
    },
  },
  plugins: [],
}
export default config

