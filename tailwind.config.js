/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/Components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    minHeight: {
      "3/4": "78vh"
    },
    container: {
      center: true,
      padding: "1rem"
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#090E34",
      dark: "#1D2144"
    },
    screens: {
      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
      "3xl": "1600px"
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      fontFamily: {
        sans: "var(--font-inter)",
        lexend: "var(--font-bai-lexend)"
      },
      gridAutoRows: {
        "3fr": "minmax(320, 3fr)"
      },
      colors: {
        Alert1: "#cd2b31",
        Alert2: "#fdd8d8",
        Alert3: "#ffe5e5",
        Success1: "#18794e",
        Success2: "#ccebd7",
        Success3: "#ddf3e4",
        Pink1: "#e34d8c",
        Pink2: "#c04277",
        Pink3: "#7d2a4d",
        Blue1: "#7000ff",
        Blue2: "#6200e3",
        Blue3: "#36007d",
        Green1: "#349974",
        Green2: "#2a7d5f",
        Green3: "#153d2e",
        Brand1: "#4529e6",
        Brand2: "#5126ea",
        Brand3: "#b0a6f0",
        Brand4: "#edeafd",
        grey0: "#0b0d0d",
        grey1: "#212529",
        grey2: "#495057",
        grey3: "#868e96",
        grey4: "#adb5bd",
        grey5: "#ced4da",
        grey6: "#dee2e6",
        grey7: "#e9ecef",
        grey8: "#f1f3f5",
        grey9: "#f8f9fa",
        grey10: "#fdfdfd"
      },
      backgroundImage: {
        car: "url('/public/motors-shop-white.svg')"
      },
      typography: {
        "heading-1-700": {
          css: {
            fontSize: "2.75rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "700",
            fontStyle: "normal",
            lineHeight: "56px"
          }
        },
        "heading-2-600": {
          css: {
            fontSize: "2.25rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "600",
            fontStyle: "normal",
            lineHeight: "45px"
          }
        },
        "heading-3-600": {
          css: {
            fontSize: "2rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "600",
            fontStyle: "normal",
            lineHeight: "40px"
          }
        },
        "heading-3-500": {
          css: {
            fontSize: "2rem",
            fontFamily: "var(--font-inter)",
            fontWeight: "500",
            fontStyle: "normal",
            lineHeight: "40px"
          }
        },
        "heading-4-600": {
          css: {
            fontSize: "1.75rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "600",
            fontStyle: "normal",
            lineHeight: "35px"
          }
        },
        "heading-4-500": {
          css: {
            fontSize: "1.75rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "500",
            fontStyle: "normal",
            lineHeight: "35px"
          }
        },
        "heading-5-600": {
          css: {
            fontSize: "1.5rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "600",
            fontStyle: "normal",
            lineHeight: "30px"
          }
        },
        "heading-5-500": {
          css: {
            fontSize: "1.5rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "500",
            fontStyle: "normal",
            lineHeight: "30px"
          }
        },
        "heading-6-600": {
          css: {
            fontSize: "1.25rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "600",
            fontStyle: "normal",
            lineHeight: "25px"
          }
        },
        "heading-6-500": {
          css: {
            fontSize: "1.25rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "500",
            fontStyle: "normal",
            lineHeight: "25px"
          }
        },
        "heading-7-600": {
          css: {
            fontSize: "1rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "600",
            fontStyle: "normal",
            lineHeight: "20px"
          }
        },
        "heading-7-500": {
          css: {
            fontSize: "1rem",
            fontFamily: "var(--font-lexend)",
            fontWeight: "500",
            fontStyle: "normal",
            lineHeight: "20px"
          }
        },
        "body-1-400": {
          css: {
            fontSize: "1rem",
            fontFamily: "var(--font-inter)",
            fontWeight: "400",
            lineHeight: "1.625"
          }
        },
        "body-1-600": {
          css: {
            fontSize: "1rem",
            fontFamily: "var(--font-inter)",
            fontWeight: "600",
            lineHeight: "1.625"
          }
        },
        "body-2-400": {
          css: {
            fontSize: "0.875rem",
            fontFamily: "var(--font-inter)",
            fontWeight: "400",
            lineHeight: "1.625"
          }
        },
        "body-2-500": {
          css: {
            fontSize: "0.875rem",
            fontFamily: "var(--font-inter)",
            fontWeight: "500",
            lineHeight: "1.625"
          }
        },
        "body-2-600": {
          css: {
            fontSize: "0.875rem",
            fontFamily: "var(--font-inter)",
            fontWeight: "500",
            lineHeight: "1.625"
          }
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp")
  ]
});
