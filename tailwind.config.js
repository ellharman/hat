module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A96D9",
        secondary: "#A69581",
        neutral: "#636573",
        contrast: "#152A43"
        
      },
      fontFamily: {
        serif: ['Cinzel Decorative', 'serif'],
      },
    }
  }
}