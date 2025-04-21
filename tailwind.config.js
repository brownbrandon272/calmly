/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2A9D8F',
          light: '#52B69A',
          dark: '#1A7D70',
        },
        secondary: {
          DEFAULT: '#8E9AAF',
          light: '#B8C0D2',
          dark: '#5E697C',
        },
        accent: {
          DEFAULT: '#CCD5AE',
          light: '#E9F0CB',
          dark: '#A3AB87',
        },
        success: '#76C893',
        warning: '#F9C74F',
        error: '#F94144',
        background: '#F8F9FA',
        foreground: '#212529',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};