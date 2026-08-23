import { useEffect } from 'react'
import { deptShort } from '@/data/departments'
import { displayTitle, staffById } from '@/data/staff'
import { allPagers } from '@/lib/inbox'
import { hms } from '@/lib/time'
import { useApp } from '@/context'
import { StaffName } from '@/components/StaffName'

export function PagerSheet() {
  const { sheet, closeSheet, profile, read, view } = useApp()
  const t = profile && sheet?.kind === 'pager' ? allPagers(profile).find((x) => x.id === sheet.id) : undefined
  useEffect(() => {
    if (t) {
      read('readPagers', t.id)
      view(`pager:${t.id}`)
    }
  }, [t, read, view])
  if (sheet?.kind !== 'pager' || !profile) return null
  if (!t) return null
  const from = t.fromStaffId === 'user' ? null : staffById(t.fromStaffId)
  const to = t.toStaffId === 'user' ? null : staffById(t.toStaffId)

  return (
    <div className="sheet-bg" onClick={closeSheet}>
      <aside className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nav-stack">
          <div className="nav-stack-row">
            <button className="nav-back" onClick={closeSheet}>
              닫기
            </button>
            <h1 className="nav-title">Pager</h1>
            <span />
          </div>
        </div>
        <div className="screen-body">
          <div className="pager-block">
            <span className={`pri ${t.priority}`}>{t.priority}</span>
            <h2 style={{ margin: '10px 0 12px' }}>{t.subject}</h2>
            <dl>
              <dt>FROM</dt>
              <dd>
                {deptShort(t.fromDeptId)} / {from ? <StaffName id={from.id} /> : profile.name} {from ? displayTitle(from) : ''}
              </dd>
              <dt>TO</dt>
              <dd>
                {deptShort(t.toDeptId)} / {to ? <StaffName id={to.id} /> : profile.name} {to ? displayTitle(to) : ''}
              </dd>
            </dl>
            <div className="stamps">
              <span>{hms(t.sent)} SENT</span>
              {t.delivered ? <span>{hms(t.delivered)} DELIVERED</span> : null}
              {t.read ? <span>{hms(t.read)} READ</span> : null}
              {t.ack ? <span>{hms(t.ack)} ACK</span> : null}
            </div>
          </div>
          <div className="group" style={{ marginTop: 16 }}>
            <div className="group-h">Follow-up</div>
            <div className="group-body">
              {t.messages.map((m, i) => (
                <div className="row static" key={i}>
                  <div className="row-text">
                    <div className="row-title">{m.staffId === 'user' ? profile.name : <StaffName id={m.staffId} />}</div>
                    <div className="row-meta">
                      {hms(m.at)} · {m.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
