import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UNICLIQUE",
  description: "Uniclique university retail made easy with custom websites and storefront",
  referrer: "origin-when-cross-origin",
  themeColor: "#590209",
  category: "e-commerce",
  applicationName: "UNICLIQUE",
  // authors: [
  //   { name: "Standard Success Edu-Tech Hub" },
  //   { name: "Standard Success Edu-Tech Hub", url: "https://ssetechub.com" },
  // ],
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "google",
    yahoo: "yahoo",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "UNICLIQUE",
    description: "Uniclique university retail made easy with custom websites and storefront",
    url: "https://uniclique.com.ng",
    siteName: "UNICLIQUE",
    images: [
      {
        url: "../images/logo.svg",
        width: 800,
        height: 600,
      },
      {
        url: "../images/logo.svg",
        width: 300,
        height: 300,
      },
      {
        url: "../images/logo.svg",
        width: 1800,
        height: 1600,
        alt: "Rolex Image",
      },
    ],
    email: "ogunseitangold105@gmail.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
