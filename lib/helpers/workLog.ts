// /lib/workLogHelpers.ts

import {
  endOfMonth,
  endOfWeek,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";

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

interface WorkLogWithDifference {
  difference: string | null;
  date: string | Date;
}

export interface TotalDifference {
  minutes: number; // total in minutes for logic
  time: string; // formatted "HH:mm" for display
}

export function calculateTotalDifference<T extends WorkLogWithDifference>(
  workLogs: T[],
  period: "week" | "month" = "week",
  dateKey: keyof T = "date"
): TotalDifference {
  const now = new Date();
  const periodStart =
    period === "week"
      ? startOfWeek(now, { weekStartsOn: 1 })
      : startOfMonth(now);
  const periodEnd =
    period === "week" ? endOfWeek(now, { weekStartsOn: 1 }) : endOfMonth(now);

  let totalMinutes = 0;

  workLogs.forEach((log) => {
    const diff = log.difference;
    const dateValue = log[dateKey];
    if (!diff || !dateValue) return;

    const logDate =
      dateValue instanceof Date ? dateValue : parseISO(dateValue as string);

    if (logDate >= periodStart && logDate <= periodEnd) {
      totalMinutes += timeToMinutes(diff);
    }
  });

  return {
    minutes: totalMinutes,
    time: minutesToTime(totalMinutes),
  };
}
