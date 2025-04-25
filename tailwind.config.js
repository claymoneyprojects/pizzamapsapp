/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '375px',    // iPhone SE
        'sm': '640px',    // Larger phones
        'md': '768px',    // Tablets
        'lg': '1024px',   // Laptops
        'xl': '1280px',   // Desktop
        '2xl': '1536px'   // Large screens
      }
    },
  },
  plugins: [],
};