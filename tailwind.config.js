/** @type {import('tailwindcss').Config} */
import { defaultThemeLight } from './modules/core/theme/default';

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './modules/**/*.{js,jsx,ts,tsx}',
    './shared/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          page: 'rgb(var(--color-page-background) / <alpha-value>)',
          modal: 'rgb(var(--color-modal-background) / <alpha-value>)',
          button: 'rgb(var(--color-button-background) / <alpha-value>)',
        },
        body: 'rgb(var(--color-text-body) / <alpha-value>)',
        accent: 'rgb(var(--color-text-accent) / <alpha-value>)',
        divider: 'rgb(var(--color-divider) / <alpha-value>)',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    // Set a default value on the `:root` element
    ({ addBase }) =>
      addBase({
        ':root': defaultThemeLight,
      }),
  ],
};
