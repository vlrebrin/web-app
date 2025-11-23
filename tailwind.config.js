//import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'
import { heroui } from "@heroui/theme";


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/component/*",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {

       screens: {
        
        'sm': { 'min': '640px', 'max': '767px' },

        'md': [
          { 'min': '668px', 'max': '767px' },
          { 'min': '766x', 'max': '1024px' },
          { 'min':'1023', 'max':'1280'}
        ]
        //  '768px',
        // => @media (min-width: 768px) { ... }

        //'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        //'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        
      }

    },
  },
  darkMode: "class",
  plugins: [heroui()]
}
export default config;

// export const content = ['./src/**/*.{js,ts,jsx,tsx}']//['./src/app/**/*.{js,ts,jsx,tsx}']//['./src/component/*']
// export const theme = {
//   extend: {
//     fontFamily: {
//       'sans': ['var(--font-manrope)', ..._fontFamily.sans]
//     }
//   }
// }
//export const plugins = []


