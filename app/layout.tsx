import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EduCRM - Student Lead Management',
  description: 'Manage student leads effectively',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}