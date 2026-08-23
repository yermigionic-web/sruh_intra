import type { Rank, RankId } from '@/types'

export const RANKS: Rank[] = [
  { id: 'intern', label: '인턴', short: '인턴', level: 10, band: 'intern' },
  { id: 'r1', label: '레지던트 1년차', short: 'R1', level: 20, band: 'resident' },
  { id: 'r2', label: '레지던트 2년차', short: 'R2', level: 21, band: 'resident' },
  { id: 'r3', label: '레지던트 3년차', short: 'R3', level: 22, band: 'resident' },
  { id: 'r4', label: '레지던트 4년차', short: 'R4', level: 23, band: 'resident' },
  { id: 'f1', label: '펠로우 1년차', short: 'F1', level: 30, band: 'fellow' },
  { id: 'f2', label: '펠로우 2년차', short: 'F2', level: 31, band: 'fellow' },
  { id: 'ap', label: '조교수', short: 'AP', level: 40, band: 'faculty' },
  { id: 'asp', label: '부교수', short: 'ASP', level: 50, band: 'faculty' },
  { id: 'prof', label: '정교수', short: 'PROF', level: 60, band: 'faculty' },
]

export const SELECTABLE_RANKS: RankId[] = RANKS.map((r) => r.id)

export function ranksForDepartment(departmentId: string): RankId[] {
  if (departmentId === 'rad' || departmentId === 'path') {
    return SELECTABLE_RANKS.filter((id) => id !== 'r4')
  }
  return SELECTABLE_RANKS
}
