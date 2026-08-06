/**
 * Color tokens live as CSS custom properties in src/css/tailwind.css
 * (dark is the default theme; light overrides via [data-theme="light"]).
 * Tailwind utilities reference the variables, so one set of utilities
 * serves both themes.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './blog/**/*.{html,md}',
    './index.html',
    './404.html',
    './src/**/*.js',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--text-muted)',
        primary: 'var(--primary)',
        'primary-deep': 'var(--primary-deep)',
        'primary-dim': 'var(--primary-dim)',
        accent: 'var(--accent)',
        link: 'var(--link)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        measure: '68ch',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
