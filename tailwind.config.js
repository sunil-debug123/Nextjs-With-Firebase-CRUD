/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wobble: {
          from: {
            transform: 'translate3d(0, 0, 0)',
          },

          '15%': {
            transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
          },

          '30%': {
            transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
          },

          '45%': {
            transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
          },

          '60%': {
            transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
          },

          '75%': {
            transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
          },

          to: {
            transform: 'translate3d(0, 0, 0)',
          },
        },
      },
      animation: {
        wobble: 'wobble 1s',
      },
    },
  },
  plugins: [],
};