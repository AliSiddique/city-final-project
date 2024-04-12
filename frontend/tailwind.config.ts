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
