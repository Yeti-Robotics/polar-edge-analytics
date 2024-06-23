import Image from "next/image";
import Button from "@repo/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Future homepage!
      <Button appName="Next.js">Hello!</Button>
    </main>
  );
}
