import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SecureLearn",
  description:
    "Learn the concepts of encryption and decryption easily, complete with interactive simulations!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <ScrollToTopButton />
        <Toaster position="bottom-right" richColors />
        <Loader2 className="animate-spin text-blue-600" />
      </body>
    </html>
  );
}
