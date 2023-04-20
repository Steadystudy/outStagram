/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'pink-light': '#F472B6',
        'pink-hot': '#FE2790',
        'yellow-light': '#FFFFB1',
        'gray-light': '#E2E4E4',
        'gray-hot': '#808080',
        'green-light': '#B8F3B8',
      },
    },
  },
  plugins: [],
};
