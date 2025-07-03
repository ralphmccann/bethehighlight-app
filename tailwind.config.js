/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        highlight: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          green: '#10B981',
          orange: '#F59E0B',
        }
      }
    },
  },
  plugins: [],
}
