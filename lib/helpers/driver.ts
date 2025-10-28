// Convert "HH:MM" string to total minutes
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Convert total minutes to "HH:MM" string
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

// Sum differences in a list of workLogs
export function sumDifferences(
  workLogs: { date: string | Date; difference?: string }[],
  startDate: Date
): number {
  return workLogs
    .filter((log) => new Date(log.date) >= startDate)
    .reduce((acc, log) => {
      if (!log.difference) return acc;
      return acc + timeToMinutes(log.difference);
    }, 0);
}

// Optional: get formatted HH:MM
export function sumDifferencesFormatted(
  workLogs: { date: string | Date; difference?: string }[],
  startDate: Date
): string {
  const totalMinutes = sumDifferences(workLogs, startDate);
  return minutesToTime(totalMinutes);
}
