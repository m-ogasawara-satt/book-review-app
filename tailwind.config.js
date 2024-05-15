module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1DA1F2',
        'custom-red': '#E0245E',
        'custom-green': '#17BF63',
        'custom-yellow': '#FFAD1F',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
}
