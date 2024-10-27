// app/layout.jsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vanguard',
  description: 'Decentralized chat application built on Ethereum',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="stealth-link.ico" sizes="any"/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}