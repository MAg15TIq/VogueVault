import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import '../styles/adSpaceRemoval.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { GrowMeScript, AdSenseHeadScript } from '@/components/ads';

// Add fallback options to prevent build failures when Google Fonts is unreachable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: false, // Disable preloading to prevent build failures
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  preload: false, // Disable preloading to prevent build failures
});

export const metadata: Metadata = {
  title: 'VogueVaults - Fashion, Beauty, Lifestyle & Culture',
  description: 'Discover the latest trends in fashion, beauty, lifestyle, and culture at VogueVaults.',
  keywords: 'fashion, beauty, lifestyle, culture, trends, style',
  other: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense script - required between head tags on each page */}
        <AdSenseHeadScript />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider>
          <CustomCursor />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* Both Google AdSense (in head) and Grow by MediaVine scripts are loaded - Adsterra has been removed */}
        <GrowMeScript />
      </body>
    </html>
  );
}
