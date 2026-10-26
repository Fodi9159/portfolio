import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Mufeed Batis | Software Developer',
  description:
    'Windows system tools, native desktop apps, and full-stack web applications, built and explained piece by piece.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen pt-16 px-6 md:px-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
