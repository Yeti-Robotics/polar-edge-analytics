import { JSONResponse } from "@/components/JSONResponse";
import { client, myCache } from "@/lib/client";

export default async function Home() {
  const event = await client.teams.getSimple(9496);
  const currentCache = myCache.getStats();
  return (
    <div className="flex flex-col gap-4 mt-4 max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-bold text-[hsl(199.4_73.6%_61.4%)]">
        YETI Blue Sandbox
      </h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Cache Stats</h2>
        <JSONResponse data={currentCache} />
      </div>
      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
        <h2 className="text-lg font-bold">JSON Response</h2>
        <JSONResponse data={event} />
      </div>
    </div>
  );
}
