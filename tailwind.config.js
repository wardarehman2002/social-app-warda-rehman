/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8fb6ff',
          400: '#5b8fff',
          500: '#3366ff',
          600: '#1b48e6',
          700: '#1638b4',
          800: '#15308c',
          900: '#162b6e',
        },
      },
    },
  },
  plugins: [],
}

