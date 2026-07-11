import type { Metadata, Viewport } from "next"
import { Toaster } from "sonner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnalyticsProvider } from "@/components/public/analytics-provider"
import localFont from 'next/font/local'
import "./globals.css"

const inter = localFont({
  src: '../../public/fonts/Inter-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
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
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#fafbfc] text-slate-900 antialiased font-sans flex flex-col">
        <Header />
        {children}
        <Footer />
        <Toaster richColors position="top-center" />
        <AnalyticsProvider />
      </body>
    </html>
  )
}
