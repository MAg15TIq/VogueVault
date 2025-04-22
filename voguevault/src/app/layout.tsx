import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

// Import layout components
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Import client layout
import ClientLayout from "./client-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VogueVault | Fashion & Lifestyle Magazine",
  description: "Your premier destination for fashion trends, lifestyle tips, and cultural insights.",
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VogueVault",
  },
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "VogueVault | Fashion & Lifestyle Magazine",
    description: "Your premier destination for fashion trends, lifestyle tips, and cultural insights.",
    siteName: "VogueVault",
    images: [{
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "VogueVault",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VogueVault | Fashion & Lifestyle Magazine",
    description: "Your premier destination for fashion trends, lifestyle tips, and cultural insights.",
    images: ["/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#9c27b0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} ${playfairDisplay.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClientLayout>
          <Header />
          <main className="flex-grow pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
