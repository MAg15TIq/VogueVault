/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          dark: 'var(--secondary-dark)',
          light: 'var(--secondary-light)',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
        'gradient-xy': 'gradient-xy 8s ease infinite',
        'fade-in-out': 'fade-in-out 3s ease-in-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'top center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'bottom center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'fade-in-out': {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--foreground)',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-dark)',
              },
            },
            h1: {
              color: 'var(--foreground)',
            },
            h2: {
              color: 'var(--foreground)',
            },
            h3: {
              color: 'var(--foreground)',
            },
            h4: {
              color: 'var(--foreground)',
            },
            h5: {
              color: 'var(--foreground)',
            },
            h6: {
              color: 'var(--foreground)',
            },
            strong: {
              color: 'var(--foreground)',
            },
            code: {
              color: 'var(--foreground)',
            },
            figcaption: {
              color: theme('colors.neutral.500'),
            },
            blockquote: {
              color: 'var(--foreground)',
              borderLeftColor: 'var(--primary-light)',
            },
          },
        },
        dark: {
          css: {
            color: 'var(--foreground)',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-light)',
              },
            },
            blockquote: {
              borderLeftColor: 'var(--primary-dark)',
              color: 'var(--foreground)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
