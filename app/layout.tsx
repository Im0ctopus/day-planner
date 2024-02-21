import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SessionProvider from '@/components/sessionprovider'
import { Toaster } from '@/components/ui/sonner'

import Nav from '@/components/nav'

const fredoka = Fredoka({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Day Planner',
  description:
    'Plan your day, week, and month with our flexible calendar and color-coded task manager. Stay organized and on top of your schedule.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${fredoka} relative h-full font-sans antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-col min-h-screen relative">
              <Nav />
              <div className="flex-grow flex-1">{children}</div>
            </main>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
