
import BlocksPlayground from "@/components/playground";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full">
      <main className="flex-1 w-full">
        <BlocksPlayground />
      </main>
    </div>
  );
}
