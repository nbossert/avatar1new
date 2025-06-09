import create from 'zustand'

export interface Player {
  id: string
  name: string
  dots: number
  balance: number
  advantage?: string
}

interface Hole {
  id: number
  dots: Record<string, number>
  score: Record<string, number>
}

interface State {
  players: Player[]
  holes: Hole[]
  pot: number
  bet: number
  activePlayer: string
  timerOn: boolean
  currentHole: number
  navigationHole: number | null
  freeLunchOrders: string[]
  actions: {
    incrementScore: (playerId: string, delta: number) => void
    setBetPerDot: (value: number) => void
    placeBet: () => void
    bankPot: () => void
    recordDot: (playerId: string, dotType: string) => void
    openGPS: (hole: number) => void
    orderFreeLunch: () => void
  }
}

export const useStore = create<State>((set, get) => ({
  players: [
    { id: 'tiger', name: 'Tiger', dots: 0, balance: 0 },
    { id: 'steph', name: 'Steph', dots: 0, balance: 0 },
  ],
  holes: [],
  pot: 0,
  bet: 25,
  activePlayer: 'tiger',
  timerOn: false,
  currentHole: 1,
  navigationHole: null,
  freeLunchOrders: [],
  actions: {
    incrementScore: (playerId, delta) => {
      set(state => {
        const holeIdx = state.currentHole - 1
        const holes = [...state.holes]
        const hole = holes[holeIdx] || { id: state.currentHole, dots: {}, score: {} }
        const current = hole.score[playerId] || 0
        hole.score[playerId] = current + delta
        holes[holeIdx] = hole
        return { holes }
      })
    },
    setBetPerDot: (value) => set({ bet: value }),
    placeBet: () => {
      set({ timerOn: true })
    },
    bankPot: () => {
      const { players, pot } = get()
      if (pot <= 0) return
      let leader = players[0]
      players.forEach(p => {
        if (p.dots > leader.dots) leader = p
      })
      const payout = Math.floor(pot / 2)
      const updatedPlayers = players.map(p =>
        p.id === leader.id ? { ...p, balance: p.balance + payout } : p
      )
      set({ players: updatedPlayers, pot: pot - payout })
    },
    recordDot: (playerId, dotType) => {
      set(state => {
        const holeIdx = state.currentHole - 1
        const holes = [...state.holes]
        const hole = holes[holeIdx] || { id: state.currentHole, dots: {}, score: {} }
        hole.dots[playerId] = (hole.dots[playerId] || 0) + 1
        holes[holeIdx] = hole
        const players = state.players.map(p =>
          p.id === playerId ? { ...p, dots: p.dots + 1 } : p
        )
        return { holes, players }
      })
    },
    openGPS: (hole) => {
      set({ navigationHole: hole })
    },
    orderFreeLunch: () => {
      const { players, freeLunchOrders } = get()
      const eligible = players.filter(p => p.balance >= 0).map(p => p.id)
      if (eligible.length)
        set({ freeLunchOrders: [...freeLunchOrders, ...eligible] })
    }
  }
}))
