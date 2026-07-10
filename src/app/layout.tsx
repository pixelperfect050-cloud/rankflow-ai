import type { Metadata, Viewport } from "next"
import { Toaster } from "sonner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnalyticsProvider } from "@/components/public/analytics-provider"
import "./globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    template: "%s | RankFlow AI",
    default: "RankFlow AI - The Ultimate AI Content & Tools Platform",
  },
  description: "Discover the best AI tools, read insightful articles, and automate your workflows with RankFlow AI.",
  keywords: ["AI Tools", "SaaS", "Software Directory", "Tech News", "RankFlow"],
  authors: [{ name: "RankFlow Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rankflow.ai",
    siteName: "RankFlow AI",
    title: "RankFlow AI",
    description: "Discover the best AI tools, read insightful articles, and automate your workflows.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RankFlow AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankFlow AI",
    description: "Discover the best AI tools, read insightful articles, and automate your workflows.",
    images: ["/og-image.jpg"],
    creator: "@rankflowai",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col">
        <Header />
        {children}
        <Footer />
        <Toaster richColors position="top-center" />
        <AnalyticsProvider />
      </body>
    </html>
  )
}
