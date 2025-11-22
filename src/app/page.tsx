"use client"

import Link from "next/link";

export default function Home() {

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen p-4 overflow-x-hidden bg-black text-white">
      <h1
        className="small:text-4xl medium:text-5xl tablet:text-6xl laptop:text-7xl font-extrabold gradient-yellow-to-red bg-clip-text text-transparent p-4 m-4"
      >
        PixelWasm
      </h1>
      <p className="pb-2 text-center">
        <strong>Rust</strong>와 <strong>WebAssembly</strong>를 활용한 차세대 고성능 웹 이미지 에디터
      </p>
      <div className="flex flex-col items-center justify-center m-4 text-center">
        <p>브라우저의 기술적 한계에 도전하여 네이티브 애플리케이션 수준의 성능을 구현한</p>
        <p>혁신적인 웹 기반 이미지 편집 도구입니다.</p>
      </div>

      <Link
        href="/editor"
        className="font-bold text-white gradient-yellow-to-red p-4 rounded-xl border-orange-400 hover:bg-none hover:bg-white hover:bg-clip-padding hover:text-orange-500 hover:border-none"
      >
        에디터 시작하기
      </Link>
    </div>
  );
}