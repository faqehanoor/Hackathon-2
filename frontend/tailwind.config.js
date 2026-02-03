/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-lora)', 'Lora', 'serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        tech: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: 800 }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: 800 }],
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: 700 }],
        'h2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: 700 }],
        'h3': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0em', fontWeight: 600 }],
        'label': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em', fontWeight: 600 }],
      },
      colors: {
        background: '#000000',
        panel: '#111111',
        surface: '#1A1A1A',
        'surface-hover': '#242424',
        glass: {
          surface: 'rgba(255, 255, 255, 0.02)',
          stroke: 'rgba(255, 255, 0, 0.1)',
          highlight: 'rgba(255, 255, 255, 0.05)',
        },
        primary: {
          DEFAULT: '#FFFF00',
          hover: '#E6E600',
          light: '#FFFF66',
        },
        secondary: {
          DEFAULT: '#FFD700',
          hover: '#EBC400',
          light: '#FFED4D',
        },
        accent: {
          violet: '#8B5CF6',
          blue: '#3B82F6',
        },
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
        },
        border: '#374151',
        error: '#ef4444',
        success: '#22c55e',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom right, #FFFF00, #FFD700)',
        'gradient-amber': 'linear-gradient(to bottom right, #FFFF00, #FFD700)',
        'gradient-violet': 'linear-gradient(to right, #8B5CF6, #3B82F6)',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 0, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 255, 0, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
        'glass-hover': '0 8px 32px 0 rgba(255, 255, 0, 0.1)',
        'glow-teal': '0 0 20px rgba(255, 255, 0, 0.3)',
        'glow-amber': '0 0 20px rgba(255, 255, 0, 0.3)',
        'premium-glass': '0 0 1px 1px rgba(255, 255, 255, 0.03), 0 20px 40px -10px rgba(0, 0, 0, 1)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
