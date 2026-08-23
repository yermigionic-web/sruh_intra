import { useEffect, useState } from 'react'
import { IconSound, IconSoundOff } from '@/components/Icons'

const MUTE_KEY = 'seoroknet.theme.muted'
const AUDIO_ID = 'seorok-theme'
const SRC = `${import.meta.env.BASE_URL}hospital-theme.mp3`

function mutedNow() {
  return localStorage.getItem(MUTE_KEY) === '1'
}

function themeEl() {
  return document.getElementById(AUDIO_ID) as HTMLAudioElement | null
}

export function requestThemePlay() {
  const el = themeEl()
  if (!el || mutedNow()) return
  el.volume = 0.32
  el.loop = true
  void el.play().catch(() => undefined)
}

export function ThemeEngine({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    const el = themeEl()
    if (!el) return
    if (!enabled) {
      el.pause()
      return
    }
    requestThemePlay()
    const resume = () => requestThemePlay()
    window.addEventListener('pointerdown', resume)
    return () => window.removeEventListener('pointerdown', resume)
  }, [enabled])

  return <audio id={AUDIO_ID} src={SRC} preload="auto" loop hidden />
}

export function ThemeToggle() {
  const [muted, setMuted] = useState(mutedNow)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = themeEl()
    if (!el) return
    const sync = () => setOn(!el.paused)
    sync()
    el.addEventListener('play', sync)
    el.addEventListener('pause', sync)
    return () => {
      el.removeEventListener('play', sync)
      el.removeEventListener('pause', sync)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
    if (muted) themeEl()?.pause()
    else requestThemePlay()
  }, [muted])

  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={muted ? '테마 재생' : '테마 음소거'}
      aria-pressed={on && !muted}
      onClick={() => setMuted((v) => !v)}
    >
      {muted || !on ? <IconSoundOff /> : <IconSound />}
    </button>
  )
}
