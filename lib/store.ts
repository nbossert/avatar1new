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
}

interface State {
  players: Player[]
  holes: Hole[]
  pot: number
  bet: number
  activePlayer: string
  timerOn: boolean
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
  actions: {
    incrementScore: (playerId, delta) => {
      // stub
    },
    setBetPerDot: (value) => set({ bet: value }),
    placeBet: () => {
      set({ timerOn: true })
    },
    bankPot: () => {
      // stub
    },
    recordDot: (playerId, dotType) => {
      // stub
    },
    openGPS: (hole) => {
      // stub
    },
    orderFreeLunch: () => {
      // stub
    }
  }
}))
