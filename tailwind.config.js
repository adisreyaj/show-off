/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{ts,scss}',
    './libs/**/*.{ts,scss}',
    'zigzag/**/*.{ts,html}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-transparent-10': 'var(--primary-transparent-10)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
