export const metadata = {
  title: 'Road Assessment App',
  description: 'Estate infrastructure and road assessment calculator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}