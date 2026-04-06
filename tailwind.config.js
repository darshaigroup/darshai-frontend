//Tailwind configuration file for the project, defining custom colors, fonts, and animations to be used throughout the application. This configuration allows for a consistent design language and enhances the visual appeal of the user interface.
** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B8E4E",
        primaryDark: "#4F6D3A",
        gold: "#C9A24A",
        lightBg: "#F7F5F0",   
        primaryLight: "#2E6F95", 
        accent: "#6FBF73",      
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
};