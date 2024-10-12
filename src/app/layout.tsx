import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../lib/Providers";

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
      <body>
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
