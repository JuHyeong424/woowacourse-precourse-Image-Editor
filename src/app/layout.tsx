import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelWasm",
  description: "Rust + WebAssembly를 활용한 차세대 고성능 웹 이미지 에디터",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
    <body
      className={`antialiased bg-black text-white w-full min-w-0`}
    >
    {children}
    </body>
    </html>
  );
}
