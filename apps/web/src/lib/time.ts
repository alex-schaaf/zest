export function minutesToHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)

  return { hours, minutes }
}
