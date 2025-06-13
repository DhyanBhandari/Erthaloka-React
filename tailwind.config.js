/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#061d01',
        'light-green': '#4CAF50',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        // --- NEW ANIMATIONS ADDED ---
        'float-pulse': 'float-pulse 3s ease-in-out infinite',
        'background-shift': 'background-shift 5s ease-in-out infinite alternate',
        'float-move-1': 'float-move-1 15s ease-in-out infinite alternate',
        'float-move-2': 'float-move-2 18s ease-in-out infinite alternate-reverse',
        // ---------------------------
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // --- NEW KEYFRAMES ADDED ---
        'float-pulse': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.02)' },
        },
        'background-shift': {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
        'float-move-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '30%': { transform: 'translate(20px, -15px) scale(1.05)' },
          '70%': { transform: 'translate(-10px, 10px) scale(0.98)' },
        },
        'float-move-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '30%': { transform: 'translate(-15px, 20px) scale(0.95)' },
          '70%': { transform: 'translate(10px, -10px) scale(1.03)' },
        },
        // ---------------------------
      },
      backdropBlur: {
        'xs': '2px',
      },
      // --- NEW BOX SHADOW ADDED ---
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.7), 0 0 100px rgba(139, 92, 246, 0.5)', // Custom glowing shadow
      }
      // ---------------------------
    },
  },
  plugins: [],
}