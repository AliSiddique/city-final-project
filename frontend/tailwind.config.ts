import type { Config } from "tailwindcss"
const defaultTheme = require("tailwindcss/defaultTheme")

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        backgroundImage: (theme) => ({
            // Blue Gradient
            gradientdown:
                "radial-gradient(140% 107.13% at 50% 10%,transparent 37.41%,#364ef580 69.27%,#6698ff 100%);",
            gradientup:
                "radial-gradient(131.66% 109.77% at 50% 97.75%, transparent 37.41%,#364ef580   69.27%,  #6698ff 100%);",
        }),
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                black: "#0f1014",
                ebony: "#1a1c23",
                mirage: "#27292D",
                blue: {
                    50: "#ECEEFE",
                    100: "#D8DDFD",
                    200: "#ACB7FB",
                    300: "#8695F9",
                    400: "#5F73F7",
                    500: "#364EF5",
                    600: "#0B28E4",
                    700: "#081EAA",
                    800: "#061470",
                    900: "#030A3A",
                    950: "#01051D",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "3rem",
                "6xl": "5rem",
            },
            // borderRadius: {
            //   lg: "var(--radius)",
            //   md: "calc(var(--radius) - 2px)",
            //   sm: "calc(var(--radius) - 4px)",
            // },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "text-reveal": {
                    "0%": {
                        transform: "translate(0, 100%)",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translate(0, 0)",
                        opacity: "1",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "text-reveal":
                    "text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
} satisfies Config

export default config

/** @type {import('tailwindcss').Config} */
// const colors = require("tailwindcss/colors");
// module.exports = {
//   content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Inter", ...defaultTheme.fontFamily.sans],
//       },
//       backgroundImage: (theme) => ({
//         // Blue Gradient
//         gradientdown:
//           "radial-gradient(140% 107.13% at 50% 10%,transparent 37.41%,#364ef580 69.27%,#6698ff 100%);",
//         gradientup:
//           "radial-gradient(131.66% 109.77% at 50% 97.75%, transparent 37.41%,#364ef580   69.27%,  #6698ff 100%);",
//       }),
//       animation: {
//         marquee: "marquee 25s linear infinite",
//         marquee2: "marquee2 25s linear infinite",
//         scroller3: "scroller3 25s linear infinite",
//         "spin-slow": "spin 4s linear infinite",
//         "spin-slower": "spin 6s linear infinite",
//         "spin-reverse": "spin-reverse 1s linear infinite",
//         "spin-reverse-slow": "spin-reverse 4s linear infinite",
//         "spin-reverse-slower": "spin-reverse 6s linear infinite",
//         scroller: "scroller 15s linear infinite",
//         scroller2: "scroller2 20s linear infinite",
//         "fade-in": "fade-in 0.5s linear forwards",
//       },
//       keyframes: {
//         marquee: {
//           "0%": {
//             transform: "translateX(0%)",
//           },
//           "100%": {
//             transform: "translateX(-100%)",
//           },
//         },
//         marquee2: {
//           "0%": {
//             transform: "translateX(100%)",
//           },
//           "100%": {
//             transform: "translateX(0%)",
//           },
//         },
//         scroller: {
//           "0%": {
//             transform: "translateY(10em)",
//           },
//           "100%": {
//             transform: "translateY(-14em)",
//           },
//         },
//         scroller2: {
//           "0%": {
//             transform: "translateY(10em)",
//           },
//           "100%": {
//             transform: "translateY(-14em)",
//           },
//         },
//         "fade-in": {
//           from: {
//             opacity: 0,
//           },
//           to: {
//             opacity: 1,
//           },
//         },
//         scroller3: {
//           "100%": {
//             transform: "translateY(-50%)",
//           },
//         },
//         "spin-reverse": {
//           to: {
//             transform: "rotate(-360deg)",
//           },
//         },
//       },
//       boxShadow: {
//         thick: "0px 7px 32px rgb(0 0 0 / 35%);",
//         inset:
//           "inset 6px 84px 79px -40px hsla(0,0%,100%,.025), inset 0 -4px 1px -3px hsla(0,0%,100%,.25), inset 0 4px 1px -3px hsla(0,0%,100%,.25);",
//       },
//       colors: {

//         black: "#0f1014",
//         ebony: "#1a1c23",
//         mirage: "#27292D",
//         blue: {
//           50: "#ECEEFE",
//           100: "#D8DDFD",
//           200: "#ACB7FB",
//           300: "#8695F9",
//           400: "#5F73F7",
//           500: "#364EF5",
//           600: "#0B28E4",
//           700: "#081EAA",
//           800: "#061470",
//           900: "#030A3A",
//           950: "#01051D",
//         },
//       },
//       borderRadius: {
//         "4xl": "2rem",
//         "5xl": "3rem",
//         "6xl": "5rem",
//       },
//     },
//   },
//   plugins: [
//     require("@tailwindcss/forms"),
//     require("@tailwindcss/typography"),
//     require("tailwind-scrollbar-hide"),
//   ],
// };
