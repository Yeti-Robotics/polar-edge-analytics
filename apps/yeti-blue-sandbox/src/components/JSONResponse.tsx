export function JSONResponse({ data }: { data: unknown }) {
  return (
    <pre className="bg-gray-100 text-gray-800 text-xs p-4 rounded-md">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
