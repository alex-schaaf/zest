import { Activity } from "@/types/activity.types"

export interface ActivityStats {
  totalDistance: number
  totalTime: number
  totalElevation: number
  averageSpeed: number
  averageHeartrate: number
  numberOfActivities: number
}

export const calcActivityStats = (activities: Activity[]) => {
  const totalDistance = activities.reduce(
    (prev, curr) => (prev += curr.distance / 1000),
    0
  )
  const totalTime = activities.reduce(
    (prev, curr) => (prev += curr.time / 60),
    0
  )
  const totalElevation = activities.reduce(
    (prev, curr) => (prev += curr.elevationGain),
    0
  )
  const averageHeartrate =
    activities.reduce((prev, curr) => (prev += curr.averageHeartrate || 0), 0) /
    activities.filter((activity) => activity.averageHeartrate != null).length
  const averageSpeed =
    activities.reduce((prev, curr) => (prev += curr.speed), 0) /
    activities.length

  return {
    totalDistance,
    totalTime,
    totalElevation,
    averageSpeed,
    averageHeartrate,
    numberOfActivities: activities.length,
  }
}
