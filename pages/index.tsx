import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6
                     bg-gradient-to-b from-green-600 to-blue-800 text-white">
      <h1 className="text-4xl font-bold">Avatar G Poker</h1>
      <p className="text-lg">Golf side-bet tracker</p>
      <Link href="/game"
            className="rounded bg-yellow-300 px-6 py-3 font-bold text-black shadow-lg">
        Play&nbsp;Now
      </Link>
    </main>
  );
}
