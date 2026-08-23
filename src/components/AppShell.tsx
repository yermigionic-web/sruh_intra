import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { HOSPITAL_NAME } from '@/brand'
import { unreadInboxCount } from '@/lib/inbox'
import { useApp } from '@/context'
import { IconBell, IconCal, IconHome, IconMore, IconMsg, IconPeople } from '@/components/Icons'
import { ProfileSheet } from '@/components/ProfileSheet'
import { NotifySheet } from '@/components/NotifySheet'
import { PagerSheet } from '@/components/PagerSheet'
import { PostSheet } from '@/components/PostSheet'

function useDesktopNav() {
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 860px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 860px)')
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}

const TABS = [
  { to: '/', label: 'Home', icon: IconHome, end: true },
  { to: '/schedule', label: 'Schedule', icon: IconCal },
  { to: '/messages', label: 'Messages', icon: IconMsg },
  { to: '/people', label: 'People', icon: IconPeople },
  { to: '/more', label: 'More', icon: IconMore },
]

export function AppShell() {
  const { profile, openNotify } = useApp()
  const loc = useLocation()
  const desktop = useDesktopNav()
  if (!profile) return null
  const unread = unreadInboxCount(profile)

  const tabs = TABS.map((t) => {
    const active = t.end ? loc.pathname === '/' : loc.pathname.startsWith(t.to)
    const Icon = t.icon
    return (
      <NavLink key={t.to} to={t.to} end={t.end} className={`tab${active ? ' active' : ''}`}>
        <Icon />
        {t.label}
        {t.to === '/messages' && unread > 0 ? <span className="dot">{unread > 9 ? '9+' : unread}</span> : null}
      </NavLink>
    )
  })

  return (
    <div className="app">
      {desktop ? (
        <nav className="tabrail" aria-label="주요 메뉴">
          <img className="brand-mark" src="/sruhlogo.png" alt="" />
          {tabs}
        </nav>
      ) : null}
      <header className="chrome">
        <img src="/sruhlogo.png" alt="" />
        <span className="hos">{HOSPITAL_NAME}</span>
        <span className="spacer" />
        <button className="icon-btn" onClick={openNotify} aria-label="알림">
          <IconBell />
          {unread > 0 ? <span className="dot">{unread > 9 ? '9+' : unread}</span> : null}
        </button>
      </header>
      <main className="stage">
        <Outlet />
      </main>
      {desktop ? null : (
        <nav className="tabbar" aria-label="주요 메뉴">
          {tabs}
        </nav>
      )}
      <ProfileSheet />
      <NotifySheet />
      <PagerSheet />
      <PostSheet />
    </div>
  )
}
