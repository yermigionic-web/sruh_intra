import type { UserProfile } from '@/types'

const KEY = 'seoroknet.staff.v1'

export function loadProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<UserProfile>
    if (!parsed.name || !parsed.departmentId || !parsed.rankId) return null
    return {
      name: parsed.name,
      gender: 'F',
      departmentId: parsed.departmentId === 'ro' ? 'rad' : parsed.departmentId,
      rankId: parsed.rankId,
      registeredAt: parsed.registeredAt ?? new Date().toISOString(),
      sessionDay: parsed.sessionDay ?? '2025-11-14',
      readMessages: parsed.readMessages ?? [],
      readPagers: parsed.readPagers ?? [],
      viewedRecords: parsed.viewedRecords ?? [],
      archiveUnlocked: parsed.archiveUnlocked ?? false,
      archiveHint: parsed.archiveHint ?? false,
      favoriteStaffIds: parsed.favoriteStaffIds ?? [],
    }
  } catch {
    return null
  }
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(KEY, JSON.stringify(profile))
}

export function clearProfile() {
  localStorage.removeItem(KEY)
}

export function markView(profile: UserProfile, id: string): UserProfile {
  if (profile.viewedRecords.includes(id)) return profile
  const viewedRecords = [...profile.viewedRecords, id]
  const archiveHint = viewedRecords.length >= 8 || profile.archiveHint
  const archiveUnlocked = viewedRecords.length >= 16 || profile.archiveUnlocked
  const next = { ...profile, viewedRecords, archiveHint, archiveUnlocked }
  saveProfile(next)
  return next
}

export function markRead(
  profile: UserProfile,
  field: 'readMessages' | 'readPagers',
  id: string,
): UserProfile {
  if (profile[field].includes(id)) return profile
  const next = { ...profile, [field]: [...profile[field], id] }
  saveProfile(next)
  return next
}

export function toggleFavorite(profile: UserProfile, staffId: string): UserProfile {
  const has = profile.favoriteStaffIds.includes(staffId)
  const favoriteStaffIds = has
    ? profile.favoriteStaffIds.filter((id) => id !== staffId)
    : [...profile.favoriteStaffIds, staffId]
  const next = { ...profile, favoriteStaffIds }
  saveProfile(next)
  return next
}
