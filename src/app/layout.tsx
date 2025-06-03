import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '../index.css'
// Update the import path below if Header exists elsewhere, for example:
// import Header from '../components/Header'
import { Toaster } from '@/components/ui/toaster';
import NextAuthSessionProvider from './providers/NextAuthSessionProvider';
import Header from '@/components/Header';
import { ErrorBoundary } from '@/components/error-boundary';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Abdelrahman Magdy',
  description: 'Full Stack Developer',
  keywords: ['Full Stack Developer', 'Web Development', 'React', 'Next.js'],
  authors: [{ name: 'Abdelrahman Magdy' }],
  creator: 'Abdelrahman Magdy',
  publisher: 'Abdelrahman Magdy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider>
              <AuthProvider>
                <NextAuthSessionProvider>
                  <Header />
                  {children}
                </NextAuthSessionProvider>
                <Toaster />
                <Analytics />
                <SpeedInsights />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
