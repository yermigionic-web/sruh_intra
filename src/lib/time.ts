export const CANONICAL_DAY = '2025-11-14'
export const CANONICAL_NOW = '2025-11-14T06:42:00+09:00'
export const CANONICAL_NOW_LABEL = '2025.11.14 금요일 06:42'

export function parseStamp(at: string): Date {
  if (at.includes('T')) return new Date(at)
  return new Date(`${CANONICAL_DAY}T${at}+09:00`)
}

export function hm(at: string): string {
  const d = parseStamp(at)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export function hms(at: string): string {
  const d = parseStamp(at)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}

export function isPast(at: string, now = CANONICAL_NOW): boolean {
  return parseStamp(at).getTime() <= parseStamp(now).getTime()
}

export function fmtDate(at: string): string {
  const d = parseStamp(at)
  const y = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}.${mo}.${da}`
}

export function weekdayKo(at: string): string {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  return days[parseStamp(at).getDay()]
}
