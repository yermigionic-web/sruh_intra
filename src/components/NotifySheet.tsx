import { useNavigate } from 'react-router-dom'
import { CONSULTS } from '@/data/consults'
import { APPROVALS } from '@/data/approvals'
import { allPagers, allThreads, unreadInboxCount } from '@/lib/inbox'
import { hm, isPast } from '@/lib/time'
import { useApp } from '@/context'
import { staffById } from '@/data/staff'
import { Group, Row } from '@/components/ui'

export function NotifySheet() {
  const { sheet, closeSheet, profile, openPager } = useApp()
  const nav = useNavigate()
  if (sheet?.kind !== 'notify' || !profile) return null
  const pagers = allPagers(profile).filter((t) => !profile.readPagers.includes(t.id)).slice(0, 5)
  const msgs = allThreads(profile).filter((t) => !profile.readMessages.includes(t.id)).slice(0, 4)
  const consults = CONSULTS.filter((c) => c.status === '미확인' && isPast(c.at + ':00'))
  const appr = APPROVALS.filter((a) => a.status === '대기' || a.status === '반려')

  return (
    <div className="sheet-bg" onClick={closeSheet}>
      <aside className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nav-stack">
          <div className="nav-stack-row">
            <button className="nav-back" onClick={closeSheet}>
              닫기
            </button>
            <h1 className="nav-title">알림</h1>
            <span />
          </div>
        </div>
        <div className="screen-body">
          <p className="faint">{unreadInboxCount(profile)}건의 미확인 연락</p>
          <Group header="Pager">
            {pagers.length === 0 ? (
              <div className="row static">
                <div className="row-text">
                  <div className="row-meta">새 호출 없음</div>
                </div>
              </div>
            ) : (
              pagers.map((p) => (
                <Row
                  key={p.id}
                  title={p.subject}
                  meta={`${staffById(p.fromStaffId)?.name ?? ''} · ${p.priority}`}
                  detail={hm(p.at)}
                  onClick={() => {
                    closeSheet()
                    openPager(p.id)
                  }}
                />
              ))
            )}
          </Group>
          <Group header="메시지">
            {msgs.map((m) => {
              const s = staffById(m.staffId)
              const last = m.messages[m.messages.length - 1]
              return (
                <Row
                  key={m.id}
                  title={s?.name ?? m.staffId}
                  meta={last?.text}
                  onClick={() => {
                    closeSheet()
                    nav(`/messages/${m.staffId}`)
                  }}
                />
              )
            })}
          </Group>
          <Group header="협진 · 결재">
            {consults.map((c) => (
              <Row key={c.id} title={c.subject} meta="미확인 응급협진" to="/more/consult" onClick={closeSheet} />
            ))}
            {appr.slice(0, 2).map((a) => (
              <Row key={a.id} title={a.title} meta={a.status} to="/more/approvals" onClick={closeSheet} />
            ))}
          </Group>
        </div>
      </aside>
    </div>
  )
}
