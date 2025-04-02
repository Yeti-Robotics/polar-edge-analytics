import { client, myCache } from "@/lib/client";

export default async function Home() {
  const event = await client.matches.getEventMatchesSimple("2025casd");
  const currentCache = myCache.getStats();
  return (
    <div>
      <h1>One SDK to Rule Them All</h1>
      <pre>{JSON.stringify(currentCache, null, 2)}</pre>
      <pre>{JSON.stringify(event, null, 2)}</pre>
    </div>
  );
}
