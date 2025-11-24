export function AiErrorComponent({message}: { message: string }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="text-red-500 text-sm mb-3"
      aria-live="assertive"
    >
      {message}
    </div>
  );
}
