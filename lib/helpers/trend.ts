// utils/trend.ts
export function getTrend(current: number, previous: number) {
  if (!previous) {
    // previous is 0 or undefined, treat as full increase
    return { value: current, positive: true };
  }

  const change = ((current - previous) / previous) * 100;

  return {
    value: Math.abs(parseFloat(change.toFixed(2))),
    positive: change >= 0,
  };
}
