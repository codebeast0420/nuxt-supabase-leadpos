import type { Config } from 'tailwindcss'
const formKitTailwind = require('@formkit/themes/tailwindcss');
const tailwindForms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin')

export default <Partial<Config>>{
  theme: {
    extend: {
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        small: '.875rem',
        base: '1rem',
        medium: '1.125rem',
        large: '1.3rem',
        '2xl': '1.5rem',
        '3xl': '2.5rem',
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      bordercolor: {
        DEFAULT: "#E5E7EB"
      },
      colors: {
        body: {
          DEFAULT: "#111827"
        },
        primary: {
          100: '#d7e5ff',
          200: '#add1ff',
          300: '#84bcff',
          400: '#5aa8ff',
          light: '#fc776a',
          DEFAULT: '#fa5c4c',
          600: '#2865cc',
          700: '#1a4e9a',
          800: '#103a73',
          900: '#092957',
        },
        secondary: {
          DEFAULT: "#4B5563",
        },
        tertiary: {
          DEFAULT: "#6B7280",
        },
        muted: {
          DEFAULT: "#6B7280",
        },
        blue: {
          DEFAULT: '#2563eb'
        },
        aqua: {
          DEFAULT: '#0C4E6E',
          light: '#D0F3FE'
        },
        gray: {
          light: "#FAFAFA",
          DEFAULT: '#F4F5F6'
        }
      },
      boxShadow: {
        'custom': '0px 0px 0px 1px rgba(9, 25, 72, 0.13), 0px 1px 2px 0px rgba(18, 55, 105, 0.08);',
      },
      btnPrimary: {
        'border-color': '#fc776a',
        'border-style': 'solid',
        'border-width': '1px',
        'border-radius': '0.25rem',
        'box-shadow': '0px 0px 0px 1px #fa5c4c',
        'background-color': '#fa5c4c',
        'background-image': 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
        'background-size': 'cover',
        'background-position': '50% 50%',
        'background-blend-mode': 'normal',
        'background-repeat': 'no-repeat',
        'text-color': 'white',
        'outline-color': '#fa5c4c',
      },
      backgroundImage: {
        'default-knob': 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(193, 199, 208, 0.08) 100%, #fff)'
      },
      plugins: [
        plugin(function ({ addComponents }) {
          addComponents({
            '.btn-primary': {
              '@apply btnPrimary': {},
            }
          });
        },
      )],
    }
  },
  content: ['./src/**/*.{html,js}', './formkit.config.ts'],
  plugins: [formKitTailwind, require('@tailwindcss/forms')]
}
