module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      small: { min: '320px', max: '479px' },
      medium: { min: '480px', max: '767px' },
      tablet: { min: '768px', max: '1023px' },
      laptop: { min: '1024px' },
    },
    extend: {},
  },
  plugins: [],
}
