import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Press_Start_2P } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import RainbowKitProviders from "@/components/RainbowKitProviders";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400"
});

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
      <body className={pressStart2P.className}>
        <RainbowKitProviders>
          <div className="flex flex-col p-4 md:p-12 h-[100vh]">
            <Navbar></Navbar>
            {children}
          </div>
        </RainbowKitProviders>
      </body>
    </html>
  );
}
