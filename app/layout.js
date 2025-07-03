import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Be the Highlight - Transform Everyday Moments',
  description: 'Learn to create highlight moments in every interaction. Based on the book "Be the Highlight: Small Actions, Big Impact" by Ralph McCann.',
  keywords: 'be the highlight, customer service, personal development, workplace excellence, highlight moments, Ralph McCann',
  author: 'Ralph McCann',
  metadataBase: new URL('https://bethehighlight.com'),
  openGraph: {
    title: 'Be the Highlight - Transform Everyday Moments',
    description: 'Learn to create highlight moments in every interaction. Practice daily challenges from the book.',
    url: 'https://bethehighlight.com',
    siteName: 'Be the Highlight',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Be the Highlight - Transform Everyday Moments',
    description: 'Learn to create highlight moments in every interaction.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="canonical" href="https://bethehighlight.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
