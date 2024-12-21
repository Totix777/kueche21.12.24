export function getWeekDates(date: Date): Date[] {
  const dates = [];
  const monday = new Date(date);
  monday.setDate(date.getDate() - (date.getDay() || 7) + 1);

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    dates.push(day);
  }
  return dates;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
  }).format(date);
}