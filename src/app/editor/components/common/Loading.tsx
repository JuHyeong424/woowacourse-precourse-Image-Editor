export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-gray-300 animate-pulse text-xl">
        WASM 모듈 로딩 중...
      </div>
    </div>
  );
}
