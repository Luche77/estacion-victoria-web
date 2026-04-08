import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cairo = Cairo({ 
  subsets: ["latin"],
  variable: '--font-cairo',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Estación Victoria FM 90.7 | Siquem Iglesia Pergamino',
  description: 'Radio cristiana de Siquem Iglesia Pergamino. Escuchá en vivo, prédicas, versículo del día y pedidos de oración. Lugar de Refugio.',
  generator: 'v0.app',
  keywords: ['radio cristiana', 'Estación Victoria', 'FM 90.7', 'Siquem Iglesia', 'Pergamino', 'prédicas', 'versículo del día'],
  openGraph: {
    title: 'Estación Victoria FM 90.7',
    description: 'Radio cristiana de Siquem Iglesia Pergamino - Lugar de Refugio',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0e27',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${cairo.variable} font-sans antialiased bg-gradient-radio min-h-screen`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
