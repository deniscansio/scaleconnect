/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Candidatos (Azul Marinho + Laranja)
        candidate: {
          primary: '#001F3F', // Azul Marinho
          secondary: '#FF8C00', // Laranja
          light: '#E8F4F8',
          dark: '#000A1A',
          accent: '#FFB84D',
        },
        // Paleta Empresas (Laranja + Azul Marinho)
        company: {
          primary: '#FF8C00', // Laranja
          secondary: '#001F3F', // Azul Marinho
          light: '#FFF5E6',
          dark: '#4D2600',
          accent: '#0033CC',
        },
        // Paleta Admin (Preto + Branco)
        admin: {
          primary: '#000000',
          secondary: '#FFFFFF',
          light: '#F5F5F5',
          dark: '#1A1A1A',
          accent: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
