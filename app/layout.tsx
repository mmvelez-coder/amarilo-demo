import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Amarilo IA | Jardines del Río, Medellín",
  description: "Conoce Palma, Arrayán y Samán en Jardines del Río, Ciudad del Río. Conversa con Amarilo IA y encuentra la información que necesitas.",
  generator: "v0.dev",
}

export const viewport = {
  themeColor: "#160B29",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
