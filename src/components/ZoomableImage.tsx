import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function ZoomableImage({
  src,
  alt,
  className,
  imgClassName,
  onOpen,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  onOpen?: () => void
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className={className ?? 'zoom-hit'}
        onClick={() => {
          onOpen?.()
          setOpen(true)
        }}
        aria-label="이미지 확대"
      >
        <img className={imgClassName} src={src} alt={alt} />
      </button>
      {open
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="확대 이미지. 다시 누르면 닫힙니다."
              onClick={() => setOpen(false)}
            >
              <img src={src} alt={alt} />
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
