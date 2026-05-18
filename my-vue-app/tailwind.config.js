/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0f0f12',
          50: '#18181f',
          100: '#1e1e28',
          200: '#2a2a36',
          300: '#3a3a48',
          400: '#5a5a6e',
          500: '#8888a0',
          600: '#aaaabc',
        },
        light: {
          DEFAULT: '#f5f2eb',
          50: '#fdfcf9',
          100: '#faf7f0',
          200: '#f0ebe0',
          300: '#e5ddd0',
          400: '#c8b898',
          500: '#8a7a60',
          600: '#5a5040',
        },
        rice: {
          DEFAULT: '#e8e0d0',
          dark: '#c8b898',
          light: '#f5f0e8',
        },
        gold: {
          DEFAULT: '#c9a04e',
          light: '#e0b860',
          dark: '#a08030',
          dim: '#8a7040',
        },
        vermillion: {
          DEFAULT: '#d44a3a',
          light: '#e86050',
          dark: '#a02a1e',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"SimSun"', 'serif'],
      },
    },
  },
  plugins: [],
}
