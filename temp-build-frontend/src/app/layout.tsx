import type { Metadata } from 'next';
import { Inter, Lora, Space_Grotesk, Playfair_Display } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});
import './globals.css';
import ClientWrapper from '@/components/ClientWrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'TodoFlow - Modern Task Management',
  description: 'A modern, futuristic task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${lora.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
        <body className="font-sans min-h-screen bg-background text-text-primary antialiased selection:bg-primary/30 selection:text-primary-light overflow-x-hidden tracking-tight">
          <ClientWrapper>{children}</ClientWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
