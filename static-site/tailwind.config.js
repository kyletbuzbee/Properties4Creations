/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1e3a8a', // Trust, Professionalism
          red: '#b91c1c',   // Action, Urgency
          olive: '#3f6212', // Veteran connection
          sand: '#f5f5f4',  // Warmth
          slate: '#334155', // Readability
        }
      }
    },
  },
  plugins: [],
}
