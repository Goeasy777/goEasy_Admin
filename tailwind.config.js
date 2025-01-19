/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

        //background colors
        navbarBG: '#1f2937',
        sidebarBG: '#1f2937',
        mainBG: '#FFFBEB',
        formBG: '#ffffff',
        dashboardBoxBG: '#ffffff',
        headerBG: '#f9fafb',
        inputBG: '#f9fafb',
        buttonBG: "#4169E1",
        linkButtonBG: "#4169E1",
        searchBG: "#4169E1",

        // text colors
        textWhite: '#ffffff',
        textBlack: '#000000',


        hrBorder: '#9ca3af'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],

};
