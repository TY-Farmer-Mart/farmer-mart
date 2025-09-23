/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#f9f9f9",
          100: "#B8B8D2",
          200: "#E2E2E2",
          300: "#BDBDBD",
          400: "#A5A5A5",
          500: "#858597",
          600: "#737373",
          700: "#525252",
          800: "#777777",
          900: "#0000008A",
        },
        black: {
          500: "#323232",
          900: "#000000",
        },
        
        green: {
          300: "#007a6e",
        },
         blue:{
          50:"#E3F2FD",
          100:"#BBDEFB",
          200:"#90CAF9",
          300:"#64B5F6",
          400:"#42A5F5",
          500:"#2196F3",
          600:"#1E88E5",
          700:"#1976D2",
          800:"#1565C0",
          900:"#0D47A1",
        },
        red: {
          500: "#ef4444",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "sans-serif",
        ],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        customBlue: "0px 4.58px 91.52px 0px rgba(167, 174, 193, 0.35)",
        customCard: "0px 4.58px 91.52px 0px rgba(167, 174, 193, 0.35)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      screens: {
        xs: "475px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
