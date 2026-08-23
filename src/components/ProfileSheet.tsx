import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PAPERS } from '@/data/academic'
import { eventsByStaff } from '@/data/events'
import { PROFILE_POSTS, RESPONSE_STATS, SCHEDULES } from '@/data/profiles'
import { deptName } from '@/data/departments'
import { displayTitle } from '@/data/staff'
import { hm, isPast } from '@/lib/time'
import { useApp } from '@/context'
import { Segmented } from '@/components/Segmented'
import type { Staff } from '@/types'

export function ProfileSheet() {
  const { sheet, closeSheet, overlayStaff } = useApp()
  if (sheet?.kind !== 'staff' || !overlayStaff) return null
  return (
    <div className="sheet-bg" onClick={closeSheet}>
      <aside className="sheet" onClick={(e) => e.stopPropagation()}>
        {overlayStaff.isMain ? <Main staff={overlayStaff} /> : <Card staff={overlayStaff} />}
      </aside>
    </div>
  )
}

function Card({ staff }: { staff: Staff }) {
  const { closeSheet } = useApp()
  return (
    <div className="profile-hero">
      <div className="avatar-lg" />
      <h2>{staff.name}</h2>
      <div className="muted">
        {deptName(staff.departmentId)} · {displayTitle(staff)}
      </div>
      {staff.specialty ? <p>{staff.specialty}</p> : null}
      <p className="faint">내선 {staff.extension ?? '—'} · {staff.employeeNo}</p>
      <p className="faint">{staff.almaMater}</p>
      <button className="btn-continue" style={{ width: 'auto', padding: '10px 18px' }} onClick={closeSheet}>
        닫기
      </button>
    </div>
  )
}

function Main({ staff }: { staff: Staff }) {
  const { closeSheet, view, favorite, profile, openPost } = useApp()
  const [tab, setTab] = useState<'posts' | 'schedule' | 'academic' | 'info'>('posts')
  const posts = PROFILE_POSTS.filter((p) => p.staffId === staff.id)
  const sched = SCHEDULES.filter((s) => s.staffId === staff.id)
  const papers = PAPERS.filter((p) => p.staffId === staff.id)
  const acts = eventsByStaff(staff.id).filter((e) => isPast(e.at))
  const stats = RESPONSE_STATS.filter((s) => s.staffId === staff.id)
  const faved = profile?.favoriteStaffIds.includes(staff.id)

  useEffect(() => {
    view(`profile:${staff.id}`)
  }, [staff.id, view])

  return (
    <>
      <div className="nav-stack">
        <div className="nav-stack-row">
          <button className="nav-back" onClick={closeSheet}>
            닫기
          </button>
          <span />
          <button className="nav-back" onClick={() => favorite(staff.id)} style={{ color: faved ? '#c05621' : undefined }}>
            {faved ? '★' : '☆'}
          </button>
        </div>
      </div>
      <div className="profile-hero">
        {staff.photo ? <img className="avatar-lg" src={staff.photo} alt="" /> : <div className="avatar-lg" />}
        <h2>{staff.name}</h2>
        <div className="muted">
          {deptName(staff.departmentId)}
          {staff.adjunctDepartmentId ? ` · ${deptName(staff.adjunctDepartmentId)}` : ''} · {displayTitle(staff)}
        </div>
        <div className="status-chip">{staff.status ?? '—'}</div>
        <p className="faint" style={{ maxWidth: 280 }}>
          {staff.bio}
        </p>
      </div>
      <div className="qa">
        <Link to={`/messages/${staff.id}`} onClick={closeSheet}>
          메시지<span>Message</span>
        </Link>
        <Link to="/messages?tab=pager" onClick={closeSheet}>
          Pager<span>호출</span>
        </Link>
        <button
          type="button"
          onClick={() => setTab('schedule')}
        >
          일정<span>Schedule</span>
        </button>
      </div>
      <div style={{ padding: '0 16px' }}>
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { id: 'posts', label: '게시물' },
            { id: 'schedule', label: '일정' },
            { id: 'academic', label: '학술' },
            { id: 'info', label: '정보' },
          ]}
        />
      </div>
      {tab === 'posts' && (
        <div className="post-grid">
          {posts.map((p) => (
            <button
              key={p.id}
              className="post-cell"
              onClick={() => {
                view(`post:${p.id}`)
                openPost(p.id)
              }}
            >
              <img className="post-thumb" src={`/posts/${p.id}.png`} alt={p.alt ?? p.caption ?? ''} />
            </button>
          ))}
        </div>
      )}
      {tab === 'schedule' && (
        <div className="group" style={{ margin: '0 16px' }}>
          <div className="group-body">
            {sched.map((s) => (
              <div className="tl" key={s.id}>
                <div className="t">{s.at}</div>
                <div>
                  <div className="ttl">{s.title}</div>
                  <div className="m">
                    {s.place} · {s.status}
                    {s.note ? ` · ${s.note}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === 'academic' && (
        <div className="group" style={{ margin: '0 16px' }}>
          <div className="group-body">
            {papers.map((p) => (
              <div className="row static" key={p.title}>
                <div className="row-text">
                  <div className="row-title">{p.title}</div>
                  <div className="row-meta">
                    {p.date} · {p.venue} · {p.role}
                  </div>
                </div>
              </div>
            ))}
            {acts.slice(0, 6).map((e) => (
              <div className="row static" key={e.id}>
                <div className="row-text">
                  <div className="row-title">{e.title}</div>
                  <div className="row-meta">
                    {hm(e.at)} {e.summary ?? ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === 'info' && (
        <div className="group" style={{ margin: '0 16px' }}>
          <div className="group-body">
            <div className="row static">
              <div className="row-text">
                <div className="row-title">전문분야</div>
                <div className="row-meta">{staff.specialty}</div>
              </div>
            </div>
            <div className="row static">
              <div className="row-text">
                <div className="row-title">학력</div>
                <div className="row-meta">{staff.almaMater}</div>
              </div>
            </div>
            <div className="row static">
              <div className="row-text">
                <div className="row-title">내선 / 사번</div>
                <div className="row-meta">
                  {staff.extension} · {staff.employeeNo}
                </div>
              </div>
            </div>
            {stats.map((s) => (
              <div className="row static" key={s.label}>
                <div className="row-text">
                  <div className="row-title">{s.label}</div>
                  <div className="row-meta">
                    {s.value}
                    {s.note ? ` · ${s.note}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
