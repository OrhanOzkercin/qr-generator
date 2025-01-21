import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QRProvider } from '@/contexts/QRContext'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate QR codes with custom templates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QRProvider>
          {children}
        </QRProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
