import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}

        <footer className="fixed bottom-0 left-0 w-full text-center text-gray-500 py-2">
          <p>
            Made by{' '}
            <a
              href="https://github.com/asuender"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              asuender
            </a>
            . Created with{' '}
            <a
              href="https://nextjs.org"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              Next.js
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
