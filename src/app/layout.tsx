import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Smart Fridge AI',
  description:
    'Scan your fridge, discover recipes instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <header className="py-4 px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Smart Fridge AI</span>
            </Link>
        </header>
        <main>{children}</main>
        <footer className="text-center p-8 text-muted-foreground text-sm">
            <div className="flex justify-center gap-8 mb-4">
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
                <Link href="#" className="hover:text-primary">Contact</Link>
            </div>
            <p>© 2024 Smart Fridge AI. All rights reserved.</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}