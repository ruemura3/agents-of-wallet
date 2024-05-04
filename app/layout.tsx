import "./globals.css";
import { Public_Sans } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import NextAuthProviders from "@/components/NextAuthProvider";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Agents of W.A.L.L.E.T</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </head>
      <body className={publicSans.className}>
        <NextAuthProviders>
          <div className="flex flex-col p-4 md:p-12 h-[100vh]">
            <Navbar></Navbar>
            {children}
          </div>
        </NextAuthProviders>
      </body>
    </html>
  );
}
