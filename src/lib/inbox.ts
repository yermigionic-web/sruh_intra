import type { ChatThread, PagerThread, UserProfile } from '@/types'
import { MESSAGE_THREADS } from '@/data/messages'
import { PAGER_THREADS } from '@/data/pager'
import { personalizedMessages, personalizedPagers } from '@/lib/personalize'

export function allPagers(user: UserProfile): PagerThread[] {
  return [...personalizedPagers(user), ...PAGER_THREADS].sort((a, b) => b.at.localeCompare(a.at))
}

export function allThreads(user: UserProfile): ChatThread[] {
  const personal = personalizedMessages(user)
  const taken = new Set(personal.map((t) => t.staffId))
  return [...personal, ...MESSAGE_THREADS.filter((t) => !taken.has(t.staffId))]
}

export function unreadPagerCount(user: UserProfile) {
  return allPagers(user).filter((t) => !user.readPagers.includes(t.id)).length
}

export function unreadMessageCount(user: UserProfile) {
  return allThreads(user).filter((t) => !user.readMessages.includes(t.id)).length
}

export function unreadInboxCount(user: UserProfile) {
  return unreadPagerCount(user) + unreadMessageCount(user)
}
