/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      xl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      primary: "#AE1829",
      // => rouge
      secondary: "#DCBF89",
      // => beige
      background: "#FFFFF2",
      // => blanc cassé
      commentBg: "#DCBF8940",
      // => beige foncé + opacité 25%
      inputBg: "#F6EFD8",
      // => beige clair
      borderInput: "#475069",
      // => gris foncé
    },
    fontFamily: {
      niconne: ["Niconne", "sans-serif"],

      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
