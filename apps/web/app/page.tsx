
import { Snowflake } from "lucide-react"

import Link from "next/link"
import { Button } from "@repo/ui/components/button"
import { Badge } from "@repo/ui/components/badge"
import { signIn } from "@/lib/auth"



export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#7FB3D5] via-[#5499C7] to-primary">
      {/* Frost overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] mix-blend-overlay pointer-events-none" />


      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white transform hover:scale-110 transition-transform">
            <Snowflake className="w-8 h-8 drop-shadow-glow" />
          </Link>
          <div className="flex items-center space-x-8">
            <div className="space-x-8 text-white/90">
              {["Data"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative hover:text-white transition-colors group"
                >
                  {item}
                  <span className="absolute inset-x-0 -bottom-1 h-px transform scale-x-0 bg-white transition-transform group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
            <form action={async () => {
              "use server";
              await signIn("discord");
            }}>
              <Button
                type="submit"
                variant="ghost"
                className="text-white hover:text-blue-100 hover:bg-white/10 backdrop-blur-sm border border-white/20"
              >
                Login →
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div
          className="text-center space-y-6 relative"
        >
          <div className="flex justify-center mb-4">
            <Badge
              variant="secondary"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-glow"
            >
              In Development
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-glow">
            Polar Edge Analytics
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
            Publicly accessible, advanced scouting data for teams in North Carolina.
            <span className="block mt-2 font-semibold">Brought to you by YETI Robotics.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <form action={async () => {
              "use server";
              await signIn("discord");
            }}>
              <Button
                type="submit"
                variant="ghost"
                className="text-white text-lg hover:text-blue-100 hover:bg-white/10 backdrop-blur-sm border p-5 border-white/20"
              >
                Scout →
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}



