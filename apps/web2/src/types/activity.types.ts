export interface Activity {
  id: bigint
  startDate: string
  distance: number
  time: number
  speed: number
  elevationGain: number
  averageHeartrate: number | null
}
