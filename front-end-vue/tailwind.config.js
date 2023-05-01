/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // theme: {
  //   extend: {}
  // },
  // plugins: []
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark']
  }
}
