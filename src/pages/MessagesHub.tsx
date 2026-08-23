import { useEffect, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { deptName } from '@/data/departments'
import { displayTitle, staffById } from '@/data/staff'
import { allPagers, allThreads } from '@/lib/inbox'
import { hm } from '@/lib/time'
import { useApp } from '@/context'
import { Screen } from '@/components/ui'
import { Segmented } from '@/components/Segmented'
import type { ChatMessage, ChatThread, UserProfile } from '@/types'

function partyName(id: string, profile: UserProfile) {
  if (id === 'user') return profile.name
  return staffById(id)?.name ?? id
}

function lastRecipient(thread: ChatThread, last: ChatMessage, profile: UserProfile) {
  if (last.fromStaffId === 'user') return partyName(thread.staffId, profile)
  const others = [...new Set(thread.messages.map((m) => m.fromStaffId))].filter((id) => id !== last.fromStaffId)
  if (others.includes('user') || thread.personalized) return profile.name
  if (others[0]) return partyName(others[0], profile)
  return partyName(thread.staffId, profile)
}

export function MessagesHub() {
  const { profile, read, view, openStaff, openPager } = useApp()
  const [params, setParams] = useSearchParams()
  const nav = useNavigate()
  const tab = params.get('tab') === 'pager' ? 'pager' : 'msg'
  if (!profile) return null
  const threads = allThreads(profile)
  const pagers = allPagers(profile)

  return (
    <Screen title="Messages" large>
      <Segmented
        value={tab}
        onChange={(v) => setParams(v === 'pager' ? { tab: 'pager' } : {})}
        options={[
          { id: 'msg', label: '메시지' },
          { id: 'pager', label: 'Pager' },
        ]}
      />
      {tab === 'msg' ? (
        <div className="group">
          <div className="group-body">
            {threads.map((t) => {
              const s = staffById(t.staffId)
              const last = t.messages[t.messages.length - 1]
              const unread = !profile.readMessages.includes(t.id)
              const from = last ? partyName(last.fromStaffId, profile) : ''
              const to = last ? lastRecipient(t, last, profile) : ''
              const involvesUser = t.personalized || t.messages.some((m) => m.fromStaffId === 'user')
              const mine = last?.fromStaffId === 'user'
              return (
                <div key={t.id} className="row msg-row">
                  {unread ? <span className="unread-dot" /> : <span className="unread-gap" />}
                  <button
                    type="button"
                    className="avatar-btn"
                    aria-label={`${s?.name ?? t.staffId} 프로필`}
                    onClick={() => s && openStaff(s.id)}
                  >
                    {s?.photo ? <img className="avatar" src={s.photo} alt="" /> : <div className="avatar" />}
                  </button>
                  <button
                    type="button"
                    className="msg-main"
                    onClick={() => {
                      read('readMessages', t.id)
                      view(`msg:${t.id}`)
                      nav(`/messages/${t.staffId}`)
                    }}
                  >
                    <div className="row-text">
                      <div className="row-title">{s?.name ?? t.staffId}</div>
                      <div className="row-meta">{s ? `${deptName(s.departmentId)} · ${displayTitle(s)}` : ''}</div>
                      <div className="row-meta">
                        {involvesUser ? (mine ? '보냄' : '받음') : '대화'} · {from} → {to}
                      </div>
                      <div className="row-meta wrap">{last?.text}</div>
                    </div>
                    <div className="row-detail">{last ? hm(last.at) : t.lastSeen}</div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="group">
          <div className="group-body">
            {pagers.map((p) => {
              const from = staffById(p.fromStaffId)
              const toName = p.toStaffId === 'user' ? profile.name : staffById(p.toStaffId)?.name
              const unread = !profile.readPagers.includes(p.id)
              const incoming = p.toStaffId === 'user'
              return (
                <button key={p.id} className="row" onClick={() => openPager(p.id)}>
                  {unread ? <span className="unread-dot" /> : <span className="unread-gap" />}
                  <div className="row-text">
                    <div className="row-title">{p.subject}</div>
                    <div className="row-meta">
                      <span className={`pri ${p.priority}`}>{p.priority}</span> {incoming ? '수신' : '발신'} · {from?.name} → {toName}
                    </div>
                  </div>
                  <div className="row-detail">{hm(p.at)}</div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </Screen>
  )
}

export function MessageThreadPage() {
  const { staffId } = useParams()
  const nav = useNavigate()
  const { profile, read, view, openStaff } = useApp()
  const threads = profile ? allThreads(profile) : []
  const thread = useMemo(
    () => threads.find((t) => t.staffId === staffId) ?? threads.find((t) => t.id === staffId),
    [threads, staffId],
  )
  useEffect(() => {
    if (thread) {
      read('readMessages', thread.id)
      view(`msg:${thread.id}`)
    }
  }, [thread, read, view])
  if (!profile) return null
  const who = thread ? staffById(thread.staffId) : staffId ? staffById(staffId) : undefined
  const senders = thread ? [...new Set(thread.messages.map((m) => m.fromStaffId))] : []
  const counterpart = senders.filter((id) => id !== 'user').map((id) => partyName(id, profile)).join(', ')

  return (
    <Screen title={who?.name ?? '메시지'} back="/messages">
      {who ? (
        <button type="button" className="row" onClick={() => openStaff(who.id)} style={{ marginBottom: 12, borderRadius: 12 }}>
          {who.photo ? <img className="avatar" src={who.photo} alt="" /> : <div className="avatar" />}
          <div className="row-text">
            <div className="row-title">{who.name}</div>
            <div className="row-meta">
              {deptName(who.departmentId)} · {displayTitle(who)}
            </div>
            <div className="row-meta">
              {senders.includes('user') ? `${profile.name} ↔ ${counterpart || who.name}` : counterpart || who.name}
            </div>
          </div>
        </button>
      ) : null}
      <div className="thread">
        {thread?.messages.map((m) => {
          const mine = m.fromStaffId === 'user'
          const from = mine ? undefined : staffById(m.fromStaffId)
          return (
            <div key={m.id} className={`bubble-row ${mine ? 'mine' : 'theirs'}`}>
              {!mine ? (
                <button
                  type="button"
                  className="avatar-btn"
                  aria-label={from?.name ?? '프로필'}
                  onClick={() => from && openStaff(from.id)}
                >
                  {from?.photo ? <img className="avatar-sm" src={from.photo} alt="" /> : <div className="avatar-sm" />}
                </button>
              ) : null}
              <div className={`bubble ${mine ? 'me' : ''}`}>
                {!mine ? <div className="who">{from?.name ?? m.fromStaffId}</div> : <div className="who">나 · {profile.name}</div>}
                <div className="when">{hm(m.at)}</div>
                {m.text}
              </div>
            </div>
          )
        })}
        {!thread ? <p className="muted">이 직원과의 대화 기록이 없습니다.</p> : null}
      </div>
      <p className="faint">
        <button className="staff-link" onClick={() => nav('/messages')}>
          목록
        </button>
      </p>
    </Screen>
  )
}
