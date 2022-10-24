/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-white': '#FEFEFE',
        'my-black': '#262626',
        'component': {
          'light': {
            'badge': '#C4C4C4',
            'border': '#878787',
            'bg': '#ECECEC'
          },
          'dark': {
            'badge': '#121212',
            'border': '#878787',
            'bg': '#5B5B5B'
          }
        }
      }
    },
    fontFamily: {
      'title': ['Fredericka the Great', 'cursive'],
      'body': ['Fredoka One', 'cursive'],
    }
  },
  plugins: [],
}
