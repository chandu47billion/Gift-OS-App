// Utility helpers for working with occasion dates throughout the app.

export function daysUntil(dateStr: string, from: Date = new Date()): number {
  const target = new Date(dateStr);
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let next = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  if (next < today) {
    next = new Date(from.getFullYear() + 1, target.getMonth(), target.getDate());
  }

  const diff = next.getTime() - today.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function monthName(monthIndex: number): string {
  return [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ][monthIndex];
}
