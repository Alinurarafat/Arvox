/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          arvox: {
            black: '#0D0D0D',
            white: '#FFFFFF',
            offwhite: '#F5F5F5',
          }
        },
        fontFamily: {
          display: ['"Playfair Display"', 'serif'],
          body: ['Inter', 'sans-serif'],
          grotesque: ['Syne', 'sans-serif'],
        },
        animation: {
          'marquee': 'marquee 20s linear infinite',
          'marquee-fast': 'marquee-fast 8s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          'marquee-fast': {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-50%)' },
          }
        }
      },
    },
    plugins: [],
  }