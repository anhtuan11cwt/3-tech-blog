import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/general/Footer";
import Navbar from "./components/general/navbar/Navbar";
import SearchModal from "./components/modals/SearchModal";
import SignInModal from "./components/modals/SignInModal";
import QueryProvider from "./providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  description: "Nền tảng blog công nghệ hiện đại",
  title: "Tech Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-background text-text flex flex-col min-h-screen`}
      >
        <QueryProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <SignInModal />
          <SearchModal />
          <Toaster position="bottom-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
