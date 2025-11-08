import dayjs from 'dayjs';

export function toYMD(ddmmyyyy) {
  // input dd/mm/yyyy -> return yyyy-MM-dd (for API)
  const [d, m, y] = ddmmyyyy.split('/');
  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
}

export function toDMY(ymd) {
  // input yyyy-MM-dd -> return dd/mm/yyyy (for UI)
  if (!ymd) return '';
  const [y,m,d] = ymd.split('-');
  return `${d}/${m}/${y}`;
}

export function todayDMY() {
  return dayjs().format('DD/MM/YYYY');
}
