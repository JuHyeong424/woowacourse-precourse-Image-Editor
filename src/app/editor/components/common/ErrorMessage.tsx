interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <p className="text-red-400 text-xl font-bold mb-4">
        오류가 발생했습니다
      </p>
      <p className="text-red-300">{message}</p>
      <p className="text-gray-400 mt-4">페이지를 새로고침 해주세요.</p>
    </div>
  );
}
