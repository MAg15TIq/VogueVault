import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/cursor.css";
import "../styles/adSpaceRemoval.css";
import Script from "next/script";

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
  other: {
    'google-adsense-account': 'ca-pub-8215873816542659',
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
      <head>
        {/* Google Analytics Tag with Consent Mode */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-630Q2457PQ"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Default consent to 'denied' until user provides consent
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });

            // Check if user has already given consent
            const hasConsent = localStorage.getItem('cookie-consent');
            if (hasConsent === 'all') {
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
              });
            }

            gtag('config', 'G-630Q2457PQ');
          `
        }} />

        {/* Grow by Mediavine Script */}
        <script data-grow-initializer="" dangerouslySetInnerHTML={{
          __html: `
            !(function(){
              window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));
              var e=document.createElement("script");
              (e.type="text/javascript"),
              (e.src="https://faves.grow.me/main.js"),
              (e.defer=!0),
              e.setAttribute("data-grow-faves-site-id","U2l0ZTo0OTU5ZjE0OC04NDJlLTRmZTctOTc5NS0wYjAwNTM4NWM2Yzk=");
              var t=document.getElementsByTagName("script")[0];
              t.parentNode.insertBefore(e,t);
            })();
          `
        }} />
      </head>

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
