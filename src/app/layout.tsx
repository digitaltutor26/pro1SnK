import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnK Systems | Future of Web Technology",
  description: "Providing state-of-the-art software engineering, interactive web applications, custom mobile development, and cloud systems engineering by SnK Systems.",
  keywords: ["SnK Systems", "Web Technology", "Software Engineering", "Next.js", "Cloud Engineering", "Mobile Solutions"],
  authors: [{ name: "SnK Systems" }],
  openGraph: {
    title: "SnK Systems | Future of Web Technology",
    description: "Providing state-of-the-art software engineering, interactive web applications, custom mobile development, and cloud systems engineering by SnK Systems.",
    url: "https://pro1snk.vercel.app",
    siteName: "SnK Systems",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnK Systems Branding Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnK Systems | Future of Web Technology",
    description: "Providing state-of-the-art software engineering, interactive web applications, custom mobile development, and cloud systems engineering by SnK Systems.",
    images: ["/og-image.png"],
  },
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
