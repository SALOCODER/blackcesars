import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Black Cesars OS',
  description:
    'Sistema de comando operativo-financiero para gestión de fondos inmobiliarios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  )
}
