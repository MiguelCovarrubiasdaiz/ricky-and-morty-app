import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import '../styles/globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rick & Morty Explorer',
  description: 'Explore characters and episodes from the Rick and Morty multiverse',
  icons: {
    icon: '/icon.jpeg',
    shortcut: '/icon.jpeg',
    apple: '/icon.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} font-mono antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
