module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        Header:'560px',
        rate:'400px',
      },

      fontSize:{
        h1:'2.6rem',
      },

      screens:{
        xs:'475px',
      },
      
      colors:{
        main: '#080A1A',
        subMain: '#d18100',
        dry: '#0B0F29',
        star: '#FFD700',
        text: '#c0c0c0',
        border: '#4b5563',
        dryGray: '#E0D500',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
