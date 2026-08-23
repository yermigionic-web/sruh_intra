import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

function I(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden width="24" height="24" {...props} />
  )
}

export const IconHome = (p: P) => (
  <I {...p}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
  </I>
)
export const IconCal = (p: P) => (
  <I {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 10h16" />
  </I>
)
export const IconMsg = (p: P) => (
  <I {...p}>
    <path d="M5 6h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 17h-6l-4 3v-3H5A1.5 1.5 0 0 1 3.5 15.5v-8A1.5 1.5 0 0 1 5 6z" />
  </I>
)
export const IconPeople = (p: P) => (
  <I {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16 19a4.5 4.5 0 0 1 5-4.2" />
  </I>
)
export const IconMore = (p: P) => (
  <I {...p}>
    <circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </I>
)
export const IconBell = (p: P) => (
  <I {...p}>
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.2 2H4.8z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </I>
)
export const IconChevron = (p: P) => (
  <I {...p}>
    <path d="M9 6l6 6-6 6" />
  </I>
)
export const IconBack = (p: P) => (
  <I {...p}>
    <path d="M15 5 8 12l7 7" />
  </I>
)
export const IconAlert = (p: P) => (
  <I {...p}>
    <path d="M12 4 3.5 19h17z" />
    <path d="M12 10v4M12 16.5h.01" />
  </I>
)
export const IconPager = (p: P) => (
  <I {...p}>
    <rect x="4" y="7" width="16" height="11" rx="2" />
    <path d="M8 4h8M8 12h4M8 15h8" />
  </I>
)
export const IconStar = (p: P) => (
  <I {...p}>
    <path d="m12 4 2.3 4.7L19.5 9l-3.7 3.6.9 5.2L12 15.8 7.3 17.8l.9-5.2L4.5 9l5.2-.3z" />
  </I>
)
export const IconSearch = (p: P) => (
  <I {...p}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-3.5-3.5" />
  </I>
)
export const IconSound = (p: P) => (
  <I {...p}>
    <path d="M5 10v4h3l4 3V7L8 10H5z" />
    <path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.2 7.5a6 6 0 0 1 0 9" />
  </I>
)
export const IconSoundOff = (p: P) => (
  <I {...p}>
    <path d="M5 10v4h3l4 3V7L8 10H5z" />
    <path d="m16 10 5 5M21 10l-5 5" />
  </I>
)
