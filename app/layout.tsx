'use client';

import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} bg-background text-secondary`}>
        <Providers>
          <div className="min-h-screen flex flex-col max-w-md mx-auto">
            <Header />
            <main className="flex-1">
              {children}

            </main>
            <Navigation /> 

          </div>
        </Providers>
      </body>
    </html>
  );
}