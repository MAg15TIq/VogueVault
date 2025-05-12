import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import '../styles/adSpaceRemoval.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { AdSenseScript, GrowMeScript } from '@/components/ads';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VogueVaults - Fashion, Beauty, Lifestyle & Culture',
  description: 'Discover the latest trends in fashion, beauty, lifestyle, and culture at VogueVaults.',
  keywords: 'fashion, beauty, lifestyle, culture, trends, style',
  other: {
    'google-adsense-account': 'ca-pub-8215873816542659',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <AdSenseScript />
      <GrowMeScript />
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider>
          <CustomCursor />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
