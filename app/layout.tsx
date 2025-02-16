import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ekagrata - Authentic Indian Craftsmanship",
  description:
    "Discover and shop authentic handcrafted products directly from skilled Indian artisans.",
  icons: {
    icon: "/favico.svg",
    shortcut: "/favico.svg",
    apple: "/favico.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body
        className={`${inter.className} h-full bg-background text-foreground`}
      >
        <div className="flex min-h-full flex-col">
          <header className="bg-white border-b">
            <Navigation />
          </header>

          {children}

          <footer className="bg-white border-t">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
              <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-center text-xs leading-5 text-gray-500">
                  &copy; {new Date().getFullYear()} Ekagrata. All rights
                  reserved.
                </p>
              </div>
              <div className="flex justify-center space-x-6 md:order-2">
                <Link
                  className="text-gray-500 hover:text-gray-600"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
                <Link
                  className="text-gray-500 hover:text-gray-600"
                  href="/terms"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
