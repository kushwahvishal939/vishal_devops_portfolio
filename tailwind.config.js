/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: "var(--color-border)", /* Minimal separation */
        input: "var(--color-input)", /* Form field backgrounds */
        ring: "var(--color-ring)", /* Electric blue focus */
        background: "var(--color-background)", /* Deep space black */
        foreground: "var(--color-foreground)", /* Pure white */
        primary: {
          DEFAULT: "var(--color-primary)", /* DevOps reliability blue */
          foreground: "var(--color-primary-foreground)", /* Pure white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Professional foundation */
          foreground: "var(--color-secondary-foreground)", /* Pure white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Error red */
          foreground: "var(--color-destructive-foreground)", /* Pure white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Subtle elevation */
          foreground: "var(--color-muted-foreground)", /* Supporting text */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Electric blue interactions */
          foreground: "var(--color-accent-foreground)", /* Deep black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Dropdown backgrounds */
          foreground: "var(--color-popover-foreground)", /* Pure white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Surface elevation */
          foreground: "var(--color-card-foreground)", /* Soft white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Achievement green */
          foreground: "var(--color-success-foreground)", /* Deep black */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Strategic orange */
          foreground: "var(--color-warning-foreground)", /* Deep black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Clear feedback red */
          foreground: "var(--color-error-foreground)", /* Pure white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'], /* Technical clarity */
        mono: ['JetBrains Mono', 'monospace'], /* Code authenticity */
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
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "neural-pulse": "neural-pulse 4s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "neural-pulse": {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.3" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(0, 153, 204, 0.1)',
        'premium-lg': '0 8px 40px rgba(0, 153, 204, 0.15)',
        'neon': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-lg': '0 0 40px rgba(0, 212, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
        'neural-network': 'radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
        'neural': '100px 100px',
      },
    },
  },
  plugins: [],
}