// /lib/workLogHelpers.ts

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function parseBreakTime(breakTime?: string): number {
  if (!breakTime) return 0;
  return timeToMinutes(breakTime);
}

export function calculateDifference(workLog: {
  gpsStartTime: string;
  gpsEndTime: string;
  reportStartTime: string;
  reportEndTime: string;
  breakTime?: string;
}): string {
  const breakMinutes = parseBreakTime(workLog.breakTime);

  const gpsTotal =
    timeToMinutes(workLog.gpsEndTime) -
    timeToMinutes(workLog.gpsStartTime) -
    breakMinutes;
  const reportTotal =
    timeToMinutes(workLog.reportEndTime) -
    timeToMinutes(workLog.reportStartTime) -
    breakMinutes;

  const diff = Math.abs(gpsTotal - reportTotal);

  return minutesToTime(diff);
}
