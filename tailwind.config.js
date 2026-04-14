/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff0f2',
          100: '#ffe0e5',
          200: '#ffc0cb',
          300: '#ff8fa0',
          400: '#ff5570',
          500: '#f52244',
          600: '#e00030',
          700: '#C8102E',
          800: '#a50e27',
          900: '#8a1025',
          950: '#4e0210',
        },
        univ: {
          50:  '#f5f6f8',
          100: '#eaecf0',
          200: '#d4d9e2',
          300: '#b0bac9',
          400: '#8695ac',
          500: '#677892',
          600: '#536179',
          700: '#445063',
          800: '#3b4454',
          900: '#343b48',
          950: '#1a1f2b',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-up':   'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in':   'scaleIn 0.3s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
        'bounce-in':  'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        float:     { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        bounceIn:  { '0%': { opacity: '0', transform: 'scale(0.3)' }, '50%': { transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
