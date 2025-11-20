export default function openInIOS(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");

  if (!win) alert("팝업 차단 해제 후 다시 시도하세요.");
}