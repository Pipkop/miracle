/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config');

export default konstaConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tg-bg': 'var(--telegram-bg-color)',
        'tg-text': 'var(--telegram-text-color)',
        'tg-hint': 'var(--telegram-hint-color)',
        'tg-link': 'var(--telegram-link-color)',
        'tg-primary': 'var(--telegram-button-color)',
        'tg-primary-text': 'var(--telegram-button-text-color)',
        'tg-secondary-bg': 'var(--telegram-secondary-bg-color)',
        'tg-header-bg': 'var(--tg-theme-header-bg-color)',
        'tg-accent-text': 'var(--tg-theme-accent-text-color)',
        'tg-section-bg': 'var(--tg-theme-section-bg-color)',
        'tg-section-text': 'var(--tg-theme-section-header-text-color)',
        'tg-subtitle-text': 'var(--tg-theme-subtitle-text-color)',
        'tg-destructive-text': 'var(--tg-theme-destructive-text-color)',
      },
    },
  },
  plugins: [],
})

