/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ESG Brand Colors
        esg: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
          },
        },
        // Risk Level Colors
        risk: {
          low: '#22c55e',
          medium: '#f59e0b',
          high: '#f97316',
          critical: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
      },
      boxShadow: {
        'esg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'esg-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'esg-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-gentle': 'pulseGentle 2s infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      screens: {
        '3xl': '1600px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    // Tailwind official plugins
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),

    // Custom ESG-specific utilities
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.glass-effect': {
          'backdrop-filter': 'blur(10px)',
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-effect-dark': {
          'backdrop-filter': 'blur(10px)',
          'background-color': 'rgba(0, 0, 0, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.gradient-primary': {
          'background': `linear-gradient(135deg, ${theme('colors.esg.blue.500')}, ${theme('colors.esg.purple.500')})`,
        },
        '.gradient-success': {
          'background': `linear-gradient(135deg, ${theme('colors.esg.green.400')}, ${theme('colors.esg.green.600')})`,
        },
        '.gradient-warning': {
          'background': `linear-gradient(135deg, ${theme('colors.yellow.400')}, ${theme('colors.orange.500')})`,
        },
        '.gradient-danger': {
          'background': `linear-gradient(135deg, ${theme('colors.red.400')}, ${theme('colors.red.600')})`,
        },
        '.animate-shimmer': {
          'background-size': '200% 200%',
          'animation': 'shimmer 1.5s ease-in-out infinite',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': `${theme('colors.gray.400')} ${theme('colors.gray.100')}`,
          '&::-webkit-scrollbar': {
            'width': '8px',
          },
          '&::-webkit-scrollbar-track': {
            'background': theme('colors.gray.100'),
          },
          '&::-webkit-scrollbar-thumb': {
            'background': theme('colors.gray.400'),
            'border-radius': '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            'background': theme('colors.gray.500'),
          },
        },
      }

      const newComponents = {
        '.esg-card': {
          'background-color': theme('colors.white'),
          'border-radius': theme('borderRadius.lg'),
          'box-shadow': theme('boxShadow.esg'),
          'border': `1px solid ${theme('colors.gray.200')}`,
          'transition': 'all 0.2s ease-in-out',
          'padding': theme('spacing.6'),

          '&:hover': {
            'box-shadow': theme('boxShadow.esg-lg'),
            'transform': 'translateY(-1px)',
          },

          '&.dark': {
            'background-color': theme('colors.gray.800'),
            'border-color': theme('colors.gray.700'),
            'color': theme('colors.gray.100'),
          }
        },

        '.esg-button': {
          'display': 'inline-flex',
          'align-items': 'center',
          'padding': `${theme('spacing.2')} ${theme('spacing.4')}`,
          'border-radius': theme('borderRadius.md'),
          'font-weight': theme('fontWeight.medium'),
          'font-size': theme('fontSize.sm'),
          'transition': 'all 0.2s ease-in-out',
          'cursor': 'pointer',
          'border': 'none',
          'text-decoration': 'none',

          '&:focus': {
            'outline': 'none',
            'ring': `2px solid ${theme('colors.esg.blue.500')}`,
            'ring-offset': '2px',
          },

          '&:disabled': {
            'opacity': '0.5',
            'cursor': 'not-allowed',
          },

          '&.primary': {
            'background-color': theme('colors.esg.blue.500'),
            'color': 'white',

            '&:hover:not(:disabled)': {
              'background-color': theme('colors.esg.blue.600'),
            },
          },

          '&.secondary': {
            'background-color': theme('colors.gray.200'),
            'color': theme('colors.gray.800'),

            '&:hover:not(:disabled)': {
              'background-color': theme('colors.gray.300'),
            },
          },

          '&.success': {
            'background-color': theme('colors.esg.green.500'),
            'color': 'white',

            '&:hover:not(:disabled)': {
              'background-color': theme('colors.esg.green.600'),
            },
          },

          '&.danger': {
            'background-color': theme('colors.red.500'),
            'color': 'white',

            '&:hover:not(:disabled)': {
              'background-color': theme('colors.red.600'),
            },
          },
        },

        '.esg-input': {
          'width': '100%',
          'padding': `${theme('spacing.2')} ${theme('spacing.3')}`,
          'border': `1px solid ${theme('colors.gray.300')}`,
          'border-radius': theme('borderRadius.md'),
          'font-size': theme('fontSize.sm'),
          'transition': 'all 0.2s ease-in-out',

          '&:focus': {
            'outline': 'none',
            'border-color': theme('colors.esg.blue.500'),
            'ring': `1px solid ${theme('colors.esg.blue.500')}`,
          },

          '&:disabled': {
            'background-color': theme('colors.gray.100'),
            'cursor': 'not-allowed',
          },

          '&.error': {
            'border-color': theme('colors.red.500'),

            '&:focus': {
              'ring': `1px solid ${theme('colors.red.500')}`,
            },
          },
        },

        '.risk-indicator': {
          'display': 'inline-flex',
          'align-items': 'center',
          'padding': `${theme('spacing.1')} ${theme('spacing.2')}`,
          'border-radius': theme('borderRadius.full'),
          'font-size': theme('fontSize.xs'),
          'font-weight': theme('fontWeight.medium'),
          'text-transform': 'uppercase',
          'letter-spacing': theme('letterSpacing.wide'),

          '&.low': {
            'background-color': theme('colors.risk.low'),
            'color': 'white',
          },

          '&.medium': {
            'background-color': theme('colors.risk.medium'),
            'color': 'white',
          },

          '&.high': {
            'background-color': theme('colors.risk.high'),
            'color': 'white',
          },

          '&.critical': {
            'background-color': theme('colors.risk.critical'),
            'color': 'white',
          },
        },

        '.esg-metric-card': {
          'background-color': theme('colors.white'),
          'border-radius': theme('borderRadius.lg'),
          'box-shadow': theme('boxShadow.esg'),
          'border': `1px solid ${theme('colors.gray.200')}`,
          'padding': theme('spacing.6'),
          'transition': 'all 0.2s ease-in-out',
          'position': 'relative',
          'overflow': 'hidden',

          '&:hover': {
            'box-shadow': theme('boxShadow.esg-lg'),
            'transform': 'translateY(-2px)',
          },

          '&::before': {
            'content': '""',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '4px',
            'background': `linear-gradient(90deg, ${theme('colors.esg.green.500')}, ${theme('colors.esg.blue.500')}, ${theme('colors.esg.purple.500')})`,
          },
        },
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    },

    // Additional keyframes plugin
    function({ addUtilities }) {
      addUtilities({
        '@keyframes shimmer': {
          '0%': { 'background-position': '200% 200%' },
          '100%': { 'background-position': '-200% -200%' },
        },
        '@keyframes float': {
          '0%, 100%': { 'transform': 'translateY(0px)' },
          '50%': { 'transform': 'translateY(-10px)' },
        },
        '@keyframes spin-slow': {
          '0%': { 'transform': 'rotate(0deg)' },
          '100%': { 'transform': 'rotate(360deg)' },
        },
        '.animate-float': {
          'animation': 'float 3s ease-in-out infinite',
        },
        '.animate-spin-slow': {
          'animation': 'spin-slow 3s linear infinite',
        },
      })
    },
  ],
}