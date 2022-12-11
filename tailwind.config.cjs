/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: ['./src/**/*.vue|ts|js', './src/*.vue|ts|js'],
  theme: {
    extend: {
      colors: {
        'gray-ice': 'rgb(215, 213, 213)',
      },

      // used for container, accounts for header / footer / border
      height: {
        // 'screen-mobile': 'calc(var(--vh, 1vh) * 100)',
        // 'mini-screen-sm': 'calc((var(--vh, 1vh) * 100) - 8em)',
        // 'mini-screen': 'calc((var(--vh, 1vh) * 100) - 13rem)',
        'mobile-screen': 'var(--vh)',
        'body-screen-sm': 'calc(var(--vh) - 8em)',
        'body-screen': 'calc(var(--vh) - 13em)',
        // 'mini-screen-sm': 'calc(100vh - 8rem)',
        // 'mini-screen': 'calc(100vh - 13rem)',
      },
      fontSize: {
        '7xl': '7rem',
      },
    },
  },
  plugins: [],
};
