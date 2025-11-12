"use client"

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-7xl font-extrabold gradient-yellow-to-red bg-clip-text text-transparent p-4 m-4">PixelWasm</h1>
      <p className="pb-2"><strong>Rust</strong>와 <strong>WebAssembly</strong>를 활용한 차세대 고성능 웹 이미지 에디터</p>
      <div className="flex flex-col items-center justify-center m-4">
        <p>브라우저의 기술적 한계에 도전하여 네이티브 애플리케이션 수준의 성능을 구현한</p>
        <p>혁신적인 웹 기반 이미지 편집 도구입니다.</p>
      </div>

      <div className="flex m-4 gap-4">
        <Link
          href="/editor"
          className="font-bold gradient-yellow-to-red p-4 rounded-xl border-orange-400 hover:bg-none hover:bg-white hover:bg-clip-padding hover:text-orange-500 hover:border-none"
        >
          에디터 시작하기
        </Link>
        <Link
          href="/benchmark"
          className="font-bold gradient-yellow-to-red p-4 rounded-xl bg-clip-text text-transparent border-2 border-orange-400 hover:bg-none hover:bg-white hover:bg-clip-padding hover:border-transparent hover:text-orange-500"
        >
          성능 벤치마크
        </Link>
      </div>
    </div>
  );
}
