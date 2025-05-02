
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem'
      },
      colors: {
        primary: {
          DEFAULT: '#2C46B1',
          dark: '#2C4091'
        },
        danger: {
          DEFAULT: '#B12C4D'
        }
      },
      keyframes: {
        'loading-bar': {
          '0%': { left: '-10rem' },
          '100%': { left: '100%' },
        },
      },
      animation: {
        'loading-bar': 'loading-bar 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

