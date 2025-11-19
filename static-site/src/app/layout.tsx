import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['300', '400', '700', '900']
})

export const metadata: Metadata = {
  title: 'Properties 4 Creations - Section 8 Housing for Veterans',
  description: 'Providing beautifully maintained Section 8 qualified rental homes and apartments specifically designed for veterans and their families. Professional property management with timeless midnight.',
  keywords: 'Section 8 housing, veterans housing, affordable rental homes, military families, Texas rentals'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}
