/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Custom breakpoint for very small screens
      },
      colors: {
        brand: {
          navy: '#1e293b',  // Deep Navy Authority: Institutional credibility
          beige: '#ffffff', // Pure white: Clean corporate professionalism
          cocoa: '#64748b', // Cool gray: Modern corporate stability
          sage: '#059669',  // Emerald trust: Financial authority & growth
          tan: '#475569',   // Dark slate: Enhanced hierarchy
          sand: '#f8fafc',  // Light gray: Subtle backgrounds
          red: '#dc2626',   // Ruby red: Professional accent
          olive: '#4d7c0f',  // Professional olive: Secondary accent
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
