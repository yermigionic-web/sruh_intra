import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { staffById } from '@/data/staff'
import { clearProfile, loadProfile, markRead, markView, saveProfile, toggleFavorite } from '@/store/session'
import type { Staff, UserProfile } from '@/types'

export type SheetState =
  | { kind: 'staff'; id: string }
  | { kind: 'pager'; id: string }
  | { kind: 'notify' }
  | { kind: 'post'; id: string }
  | null

interface AppState {
  profile: UserProfile | null
  sheet: SheetState
  register: (p: UserProfile) => void
  reset: () => void
  view: (id: string) => void
  read: (field: 'readMessages' | 'readPagers', id: string) => void
  favorite: (staffId: string) => void
  openStaff: (id: string) => void
  openPager: (id: string) => void
  openNotify: () => void
  openPost: (id: string) => void
  closeSheet: () => void
  overlayStaff: Staff | null
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(() => loadProfile())
  const [sheet, setSheet] = useState<SheetState>(null)

  const register = useCallback((p: UserProfile) => {
    saveProfile(p)
    setProfile(p)
  }, [])

  const reset = useCallback(() => {
    clearProfile()
    setProfile(null)
    setSheet(null)
  }, [])

  const view = useCallback((id: string) => {
    setProfile((cur) => (cur ? markView(cur, id) : cur))
  }, [])

  const read = useCallback((field: 'readMessages' | 'readPagers', id: string) => {
    setProfile((cur) => (cur ? markRead(cur, field, id) : cur))
  }, [])

  const favorite = useCallback((staffId: string) => {
    setProfile((cur) => (cur ? toggleFavorite(cur, staffId) : cur))
  }, [])

  const openStaff = useCallback((id: string) => setSheet({ kind: 'staff', id }), [])
  const openPager = useCallback((id: string) => setSheet({ kind: 'pager', id }), [])
  const openNotify = useCallback(() => setSheet({ kind: 'notify' }), [])
  const openPost = useCallback((id: string) => setSheet({ kind: 'post', id }), [])
  const closeSheet = useCallback(() => setSheet(null), [])

  const overlayStaff = sheet?.kind === 'staff' ? staffById(sheet.id) ?? null : null

  const value = useMemo(
    () => ({
      profile,
      sheet,
      register,
      reset,
      view,
      read,
      favorite,
      openStaff,
      openPager,
      openNotify,
      openPost,
      closeSheet,
      overlayStaff,
    }),
    [profile, sheet, register, reset, view, read, favorite, openStaff, openPager, openNotify, openPost, closeSheet, overlayStaff],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useApp')
  return v
}
