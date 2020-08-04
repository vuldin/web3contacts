const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateColumns: {
        contacts: '30px auto',
        skills: '100px auto',
        'md-main': 'min-content auto'
      },
      gridTemplateRows: {
        'md-main': '1fr auto'
      }
    }
  },
  variants: {
    userSelect: ['responsive', 'hover', 'focus']
  },
  plugins: ['@tailwindcss/ui']
}
