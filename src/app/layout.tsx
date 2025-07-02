import React from 'react'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { NavbarMain } from './components/Navbar'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: 'GitHub Career Roadmap Generator',
  description: 'AI-powered career roadmap generation based on your GitHub profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}