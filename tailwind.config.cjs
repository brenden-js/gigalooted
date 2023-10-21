/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  theme: {
    extend: {
      fontFamily: {
        subheading: ["var(--font-crimson)"],
        heading: ["var(--font-lato)"]
      },
    },
  },
};
