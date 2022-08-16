/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins',
        inter: 'Inter',
      },
      colors: {
        babli: '#11101D',
        babu: '#2c2859',
        bablu: '#020221',
        babla: 'rgba(2, 20, 53, 9)',
        primary: {
          blue: '#020317',
          red: '#923535',
          green: '#033512',
          violet: '#522AA6',
        },
        muted: {
          green: '#012900',
          gray: 'rgba(255, 255, 255, 0.15)',
        },
        highlights: {
          blue: 'rgba(219, 234, 254, 0.3)',
        },
      },
    },
  },
  plugins: [],
}
