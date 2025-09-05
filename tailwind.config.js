/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",   // ✅ allows toggling with <html class="dark">
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: { "2xl": "1200px" }
        },
        extend: {
            colors: {
                brand: {
                    50: "#eef2ff",
                    100: "#e0e7ff",
                    500: "#4f46e5",
                    600: "#4338ca",
                    700: "#3730a3"
                }
            },
            boxShadow: {
                soft: "0 10px 30px rgba(2, 6, 23, 0.08)"
            },
            borderRadius: {
                "2xl": "1rem"
            }
        }
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
}