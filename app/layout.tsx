import "./globals.css";

export const metadata = {
  title: "dockersize",
  description: "A simple tool to get docker image sizes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark dark:bg-slate-800">
      <body className="flex items-center justify-center w-screen h-screen p-3">
        {children}

        <footer className="fixed bottom-0 left-0 w-full text-center text-gray-500 py-2">
          <p>
            Made by
            <a
              href="https://github.com/asuender"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              {" "}
              asuender
            </a>
            . Created with
            <a
              href="https://nextjs.org"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              {" "}
              Next.js{" "}
            </a>
            and
            <a
              href="https://vercel.com/"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              {" "}
              Vercel
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
