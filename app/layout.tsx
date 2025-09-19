import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BetterAuthProvider } from '@/components/auth-provider'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'Ocean Hazard Reporting Platform',
  description: 'A platform to report ocean hazards and receive updates from officials.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${openSans.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        <BetterAuthProvider>
          {children}
        </BetterAuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
