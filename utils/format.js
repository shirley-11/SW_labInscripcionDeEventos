// Fechas en castellano, en la zona horaria Europe/Madrid: "viernes, 20 de noviembre · 17:30"
const part = (date, options) =>
  new Intl.DateTimeFormat('es', { timeZone: 'Europe/Madrid', ...options }).format(date);

exports.fmtDate = date =>
  `${part(date, { weekday: 'long' })}, ${part(date, { day: 'numeric' })} de ${part(date, { month: 'long' })}` +
  ` · ${part(date, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}`;
