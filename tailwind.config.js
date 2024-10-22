const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        serif: ["Lora", ...fontFamily.serif],
        mono: ["JetBrains Mono", ...fontFamily.mono],
        mono2: ["IBM Plex Mono", ...fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              color: theme("colors.pink.500"),
              fontWeight: "normal",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h1,h2,h3,h4": {
              color: theme("colors.gray.100"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
