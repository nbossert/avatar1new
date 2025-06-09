import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link href="/game" className="text-blue-500 underline">
        Go to Game
      </Link>
    </div>
  )
}
