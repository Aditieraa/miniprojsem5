/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* Light gray for separation */
        input: "var(--color-input)", /* White or near-white */
        ring: "var(--color-primary)", /* Primary color for focus rings */
        background: "var(--color-background)", /* Off-white/light gray body background */
        foreground: "var(--color-foreground)", /* Dark text color */
        primary: {
          DEFAULT: "var(--color-primary)", /* Navy Blue */
          foreground: "var(--color-primary-foreground)", /* White */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Dark Teal/Cyan for secondary actions */
          foreground: "var(--color-secondary-foreground)", /* White */
        },
        destructive: {
          DEFAULT: "var(--color-error)", /* Red */
          foreground: "var(--color-error-foreground)", /* White */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Lighter gray for backgrounds */
          foreground: "var(--color-muted-foreground)", /* Medium gray for secondary text */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Orange/Gold for alerts/emphasis */
          foreground: "var(--color-accent-foreground)", /* White */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* White */
          foreground: "var(--color-popover-foreground)", /* Dark text */
        },
        card: {
          DEFAULT: "var(--color-card)", /* White or light background for components */
          foreground: "var(--color-card-foreground)", /* Dark text */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Green */
          foreground: "var(--color-success-foreground)", /* White */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Yellow/Amber */
          foreground: "var(--color-warning-foreground)", /* White */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Red */
          foreground: "var(--color-error-foreground)", /* White */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'moderate': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'prominent': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer": "shimmer 2s infinite",
        "scale-in": "scale-in 0.3s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
