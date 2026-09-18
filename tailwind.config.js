/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a192f',
          800: '#112240',
          700: '#233554',
        },
        teal: {
          500: '#64ffda',
          400: '#5BC0BE',
          300: '#00b4d8',
        },
        primary: '#0B132B',
        secondary: '#1C2541',
        accent: '#3A506B',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#0B132B',
        'text-muted': '#4a5568'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(2,12,27,0.1)',
        'premium': '0 4px 20px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
