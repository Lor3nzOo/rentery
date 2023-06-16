/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    colors: {
      'light-white': '#E8E8E8',
      'gray': '#4A4A4A',
      'purple': '#2F2E41',
      'yellow': '#FF9900',
      'light-gray': '#CCCCCC',
      'blue': '#055999',
      'dark-blue': '#002B4D',
      'light-blue': '#1574BC'
    }
  },

  plugins: [],
};

module.exports = config;
