module.exports = {
  theme: {
    extend: {
      colors: {
        'gray-ice': 'rgb(215, 213, 213)',
      },

      // used for container, accounts for header / footer / border
      height: {
        'screen-mobile': 'calc(var(--vh, 1vh) * 100)',
        'mini-screen-sm': 'calc((var(--vh, 1vh) * 100) - 8em)',
        'mini-screen': 'calc((var(--vh, 1vh) * 100) - 13rem)',
        // 'mini-screen-sm': 'calc(100vh - 8rem)',
        // 'mini-screen': 'calc(100vh - 13rem)',
      },
      fontSize: {
        '7xl': '7rem',
      },
    },
  },
};
