export function AiErrorComponent({ message }: { message: string }) {
  return <p className="text-red-500 text-sm mb-3" aria-live="assertive">{message}</p>;
}
