"use client";

import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="mb-4">
      <a
        className={`mr-4 ${pathname === "/" ? "text-white border-b" : ""}`}
        href="/"
      >
        🕴️ Intro
      </a>
      <a
        className={`mr-4 ${
          pathname === "/agent-1" ? "text-white border-b" : ""
        }`}
        href="/agent-1"
      >
        📈 Crypto trend
      </a>
      <a
        className={`mr-4 ${
          pathname === "/agent-2" ? "text-white border-b" : ""
        }`}
        href="/agent-2"
      >
        👛 Assets
      </a>
      <a
        className={`mr-4 ${
          pathname === "/agent-3" ? "text-white border-b" : ""
        }`}
        href="/agent-3"
      >
        💰 Trade crypto
      </a>
      <a
        className={`mr-4 ${
          pathname === "/agent-4" ? "text-white border-b" : ""
        }`}
        href="/agent-4"
      >
        🙋 Q&A
      </a>
    </nav>
  );
}
