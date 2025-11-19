/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1e3a8a', // Primary: Trust, Professionalism (Tailwind blue-900)
          red: '#b91c1c',  // Accent: Action, Urgency (Tailwind red-700)
          olive: '#3f6212', // Secondary: Growth, Veteran connection (Tailwind lime-800)
          sand: '#f5f5f4',  // Background: Warmth (Tailwind stone-100)
          slate: '#334155', // Text: Readability (Tailwind slate-700)
        }
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'], // Emotional/Trust headlines
        body: ['Inter', 'sans-serif'],      // Clean data/UI text
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)',
        'float': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem', // Softer, modern feel
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
