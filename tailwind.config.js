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
            'bg': '#ECECEC'
          },
          'dark': {
            'badge': '#121212',
            'bg': '#5B5B5B'
          },
          'border': '#878787',
        }
      }
    },
    fontFamily: {
      'title': ['Fredericka the Great', 'cursive'],
      'body': ['Fredoka One', 'cursive'],
      'thin': ['Fredoka', 'cursive'],
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
