import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'VogueVault - Fashion, Beauty, Lifestyle & Culture',
  description: 'Discover the latest trends in fashion, beauty, lifestyle, and culture at VogueVault.',
  keywords: 'fashion, beauty, lifestyle, culture, trends, style',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
