import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeatherSnap",
  description: "Modern weather dashboard with 5-day forecast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
