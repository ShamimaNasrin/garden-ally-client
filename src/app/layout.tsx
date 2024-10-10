import type { Metadata } from "next";
import "./globals.css";
// import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

// const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Garden Ally",
  description:
    "Join a vibrant community of plant enthusiasts to share tips, review products, and grow together on Garden Ally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="">
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
