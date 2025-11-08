// Simple chart data service for time series
export function generateTimeseries(days = 30, base = 200, noise = 40) {
  const data = [];
  const labels = [];
  let value = base;
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    value = value + (Math.random() * noise - noise / 2);
    value = Math.max(0, Math.round(value));
    labels.push(`${d.getMonth()+1}/${d.getDate()}`);
    data.push(value);
  }
  return { labels, data };
}

export function getTimeseries(range = '7d') {
  switch (range) {
    case '7d':
      return generateTimeseries(7, 180, 30);
    case '30d':
      return generateTimeseries(30, 200, 40);
    case '90d':
      return generateTimeseries(90, 220, 50);
    default:
      return generateTimeseries(30, 200, 40);
  }
}
