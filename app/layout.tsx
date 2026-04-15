import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo application built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
