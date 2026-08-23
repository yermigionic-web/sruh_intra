import { Link, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { IconBack } from '@/components/Icons'

export function Screen({
  title,
  back,
  right,
  large,
  children,
}: {
  title: string
  back?: string
  right?: ReactNode
  large?: boolean
  children: ReactNode
}) {
  const nav = useNavigate()
  return (
    <div className="screen">
      <header className="nav-stack">
        <div className="nav-stack-row">
          {back ? (
            back === '-' ? (
              <button className="nav-back" aria-label="뒤로" onClick={() => nav(-1)}>
                <IconBack />
              </button>
            ) : (
              <Link className="nav-back" to={back} aria-label="뒤로">
                <IconBack />
              </Link>
            )
          ) : (
            <span className="nav-back-space" />
          )}
          {!large ? <h1 className="nav-title">{title}</h1> : <span />}
          <div className="nav-right">{right}</div>
        </div>
        {large ? <h1 className="large-title">{title}</h1> : null}
      </header>
      <div className="screen-body">{children}</div>
    </div>
  )
}

export function Group({ header, children }: { header?: string; children: ReactNode }) {
  return (
    <section className="group">
      {header ? <div className="group-h">{header}</div> : null}
      <div className="group-body">{children}</div>
    </section>
  )
}

export function Row({
  title,
  meta,
  detail,
  onClick,
  to,
  leading,
  danger,
}: {
  title: ReactNode
  meta?: ReactNode
  detail?: ReactNode
  onClick?: () => void
  to?: string
  leading?: ReactNode
  danger?: boolean
}) {
  const inner = (
    <>
      {leading}
      <div className="row-text">
        <div className={`row-title ${danger ? 'danger' : ''}`}>{title}</div>
        {meta ? <div className="row-meta">{meta}</div> : null}
      </div>
      {detail ? <div className="row-detail">{detail}</div> : null}
      {to || onClick ? <span className="chev">›</span> : null}
    </>
  )
  if (to) {
    return (
      <Link className="row" to={to} onClick={onClick}>
        {inner}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button type="button" className="row" onClick={onClick}>
        {inner}
      </button>
    )
  }
  return <div className="row static">{inner}</div>
}
