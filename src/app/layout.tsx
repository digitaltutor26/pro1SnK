import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Company Landing Page",
  description: "Explore our company vision, services, and contact us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
