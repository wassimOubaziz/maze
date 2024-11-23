module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maze-wall': '#1a1a1a',
        'maze-path': '#ffffff',
        'maze-visited': '#4ade80',
        'maze-current': '#3b82f6',
        'maze-start': '#22c55e',
        'maze-end': '#ef4444',
      }
    },
  },
  plugins: [],
}