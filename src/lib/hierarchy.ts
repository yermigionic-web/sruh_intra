import { RANKS } from '@/data/ranks'
import type { RankBand, RankId, Staff, UserProfile } from '@/types'

export function rankOf(id: RankId) {
  return RANKS.find((r) => r.id === id)!
}

export function rankShort(id: RankId) {
  return rankOf(id).short
}

export function rankLabel(id: RankId) {
  return rankOf(id).label
}

export function compareRank(a: RankId, b: RankId): number {
  return rankOf(a).level - rankOf(b).level
}

export type RankRelation = 'above' | 'peer' | 'below'

export function relationTo(user: UserProfile, staff: Staff): RankRelation {
  const d = compareRank(user.rankId, staff.rankId)
  if (d > 0) return 'above'
  if (d < 0) return 'below'
  return 'peer'
}

export function bandOf(id: RankId): RankBand {
  return rankOf(id).band
}

export function sameDept(user: UserProfile, staff: Staff) {
  return (
    user.departmentId === staff.departmentId ||
    user.departmentId === staff.adjunctDepartmentId
  )
}

export function frequentConsult(userDept: string, npcDept: string): boolean {
  const pairs: Record<string, string[]> = {
    em: ['rad', 'ns', 'im', 'os', 'an'],
    ns: ['rad', 'em', 'an', 'path'],
    os: ['rad', 'an', 'em'],
    im: ['rad', 'em', 'path', 'an'],
    rad: ['em', 'ns', 'os', 'im', 'an'],
    an: ['os', 'ns', 'em', 'obgyn'],
    path: ['im', 'ns', 'os', 'obgyn'],
    ped: ['em', 'rad', 'an'],
    obgyn: ['an', 'rad', 'path'],
    ent: ['an', 'rad'],
  }
  return pairs[userDept]?.includes(npcDept) ?? false
}
