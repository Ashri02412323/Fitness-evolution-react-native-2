/** @type {import('tailwindcss').Config} */
const nativewind = require('nativewind/tailwind/css');
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B1215",
        mint:{
          100:"#00C7BE",
          87:"#01AFA8",
        },
        secondary:"#101A1E",
        white_87:"#DFE0E1",
        white_60: "#9DA0A1",
        white_38:"#686C6E",
        stroke_38:"#6B7376",
        lava:"#352F36",
        requested: "#1F67FF",
        upcoming:"#D8730A",
        completed: "#73C34D",
        red: "#FF3B30",
        tertiary: "#131B1E",
      },
      fontFamily:{
        pop_Bold:['Poppins-Bold'],
        pop_Regular:['Poppins-Regular'],
        pop_Medium:['Poppins-Medium'],
        pop_SemiBold:['Poppins-SemiBold'],
        pop_Light:['Poppins-Light'],
        inter_Bold:['Inter_28pt-Bold'],
        inter_Regular:['Inter_28pt-Regular'],
        inter_Medium:['Inter_28pt-Medium'],
        inter_SemiBold:['Inter_28pt-SemiBold'],
        inter_Light:['Inter_28pt-Light'],
        dm_Bold:['DMSans-Bold'],
        dm_Regular:['DMSans-Regular'],
        dm_Medium:['DMSans-Medium'],
        dm_SemiBold:['DMSans-SemiBold'],
        dm_Light:['DMSans-Light'],
        cinzel_Bold:['Cinzel-Bold'],
      }
    },
  },
  plugins: [nativewind],
}

