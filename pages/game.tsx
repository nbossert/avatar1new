import { useEffect } from 'react'
import { useStore } from '../lib/store'

export default function Game() {
  const { players, bet, pot, currentHole, navigationHole, freeLunchOrders, timerOn, actions } = useStore()

  useEffect(() => {
    let id: NodeJS.Timeout
    if (timerOn) {
      id = setTimeout(() => useStore.setState({ timerOn: false }), 60000)
    }
    return () => clearTimeout(id)
  }, [timerOn])

  return (
    <div className="min-h-screen flex flex-col bg-green-700 text-white" style={{ width: 390, height: 844 }}>
      <div id="titleBar" className={`h-10 flex justify-center items-center bg-black font-bold text-lg tracking-wider relative ${timerOn ? 'ring-4 ring-yellow-300' : ''}`}>Avatar G
        {timerOn && <span id="timerHint" className="absolute right-2 top-0.5 text-yellow-300 text-xs animate-pulse">Yellow means Bet timer is on you</span>}
      </div>
      <div className="text-center py-1 bg-gray-800 text-sm">Hole {currentHole} &bull; Pot ${pot}</div>
      {navigationHole && <div className="text-center text-xs bg-blue-900 py-1">Navigating to hole {navigationHole}...</div>}

      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {players.map(p => (
          <div key={p.id} className="flex flex-col gap-2 bg-black/50 p-2 rounded">
            <div className="h-8 px-4 flex items-center justify-center font-bold text-base" style={{ backgroundColor: p.name === 'Tiger' ? '#dc2626' : '#22d3ee', color: '#000' }}>{p.name}</div>
            {p.advantage && <div className="mt-1 text-[10px] text-yellow-300">{p.advantage}</div>}
            <div className="dotTotalReel w-40 h-20 overflow-hidden relative bg-black/80 border border-white">
              <ul className="absolute text-green-400 font-mono text-3xl leading-[80px] animate-reel">
                <li>+{p.dots}</li>
              </ul>
            </div>
            <details>
              <summary>Scorecard</summary>
              <table className="w-full text-xs"><tbody><tr><td>score...</td></tr></tbody></table>
            </details>
            <span className={`balanceBadge w-28 h-12 flex items-center justify-center text-white font-extrabold text-xl ${p.balance>=0 ? 'bg-black border border-white' : 'bg-red-600 border border-blue-600'}`}>${p.balance}</span>
          </div>
        ))}
      </div>

        {freeLunchOrders.length > 0 && <div className="text-xs text-center bg-green-800 py-1">Lunch ordered for: {freeLunchOrders.join(', ')}</div>}
        <div className="sticky bottom-0 bg-gray-900 p-2 flex flex-wrap items-center gap-2">
          <span id="betAmount" className="w-20 text-center bg-gray-800 text-yellow-300 text-xl">${bet}</span>
          <button className="arrowBtn w-6 h-6 rounded bg-blue-700 text-white" onClick={() => actions.setBetPerDot(Math.min(200, bet+1))}>▲</button>
          <button className="arrowBtn w-6 h-6 rounded bg-blue-700 text-white" onClick={() => actions.setBetPerDot(Math.max(1, bet-1))}>▼</button>
          <button id="yellowPush" className="ml-2 px-6 py-2 bg-yellow-300 text-black font-bold rounded" onClick={() => actions.placeBet()}>Bet</button>
          <button className="px-3 py-2 bg-blue-600 rounded" onClick={() => actions.bankPot()}>Bank</button>
          <button className="px-3 py-2 bg-purple-600 rounded" onClick={() => actions.openGPS(currentHole)}>GPS</button>
          <button className="px-3 py-2 bg-green-600 rounded" onClick={() => actions.orderFreeLunch()}>Lunch</button>
        </div>
    </div>
  )
}
