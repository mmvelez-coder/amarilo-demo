import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Red_Rose } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const redRose = Red_Rose({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-rose",
})

export const metadata: Metadata = {
  title: "Amarilo IA | Jardines del Río, Medellín",
  description: "Conoce Palma, Arrayán y Samán en Jardines del Río, Ciudad del Río. Conversa con Amarilo IA y encuentra la información que necesitas.",
  generator: "v0.dev",
}

export const viewport = {
  themeColor: "#f6f7f4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${redRose.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
