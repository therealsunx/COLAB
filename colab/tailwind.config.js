/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#02635d',
        secondary: '#8afff1',
        tertiary: '#fca103'
      }
    },
  },
  plugins: [],
}
