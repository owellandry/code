/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: '#1a1a1a',
        bgSidebar: '#222222',
        bgEditor: '#1e1e1e',
        bgActive: '#2d2d2d',
        textMain: '#cccccc',
        textMuted: '#888888',
        accent: '#0066ff'
      },
      fontFamily: {
        mono: ['"Fira Code"', 'Consolas', 'Monaco', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [],
}
