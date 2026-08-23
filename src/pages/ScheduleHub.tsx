import { useSearchParams } from 'react-router-dom'
import { CONFERENCES } from '@/data/academic'
import { DUTY_SLOTS } from '@/data/duty'
import { SURGERIES } from '@/data/surgeries'
import { SCHEDULES } from '@/data/profiles'
import { DEPARTMENTS, deptName } from '@/data/departments'
import { displayTitle, staffById } from '@/data/staff'
import { bandOf, rankShort } from '@/lib/hierarchy'
import { dashboardDutyLabel } from '@/lib/personalize'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'
import { Segmented } from '@/components/Segmented'
import { StaffName } from '@/components/StaffName'
import type { DutySlot, UserProfile } from '@/types'

function showUserInSlot(slot: DutySlot, user: UserProfile) {
  if (slot.placeholder !== 'user') return false
  if (slot.departmentId !== user.departmentId) return false
  const night = bandOf(user.rankId) === 'resident' || bandOf(user.rankId) === 'intern'
  const day = bandOf(user.rankId) === 'fellow' || bandOf(user.rankId) === 'faculty'
  if (slot.shift === 'NIGHT') return night
  if (slot.shift === 'DAY') return day
  return false
}

export function ScheduleHub() {
  const { profile, view } = useApp()
  const [params, setParams] = useSearchParams()
  const tab = (params.get('tab') as 'today' | 'week' | 'duty') || 'today'
  if (!profile) return null

  return (
    <Screen title="Schedule" large>
      <Segmented
        value={tab}
        onChange={(v) => setParams(v === 'today' ? {} : { tab: v })}
        options={[
          { id: 'today', label: '오늘' },
          { id: 'week', label: '이번 주' },
          { id: 'duty', label: '당직' },
        ]}
      />
      {tab === 'today' && <Today view={view} />}
      {tab === 'week' && <Week />}
      {tab === 'duty' && <Duty profile={profile} view={view} />}
    </Screen>
  )
}

function Today({ view }: { view: (id: string) => void }) {
  return (
    <>
      <Group header="원내">
        {CONFERENCES.map((c) => (
          <Row key={c.id} title={c.title} meta={`${c.place}${c.note ? ` · ${c.note}` : ''}`} detail={c.at} onClick={() => view(`conf:${c.id}`)} />
        ))}
      </Group>
      <Group header="수술실">
        {SURGERIES.map((s) => (
          <Row
            key={s.id}
            title={`${s.or} · ${s.procedure}`}
            meta={`${deptName(s.departmentId)} · ${staffById(s.surgeonId)?.name ?? ''} ${s.status}`}
            detail={s.start}
            to="/more/or"
          />
        ))}
      </Group>
      <Group header="개인 일정 기록">
        {SCHEDULES.filter((s) => ['park-harim', 'kang-bin', 'kim-sion', 'oh-yoonkyung'].includes(s.staffId)).map((s) => (
          <Row
            key={s.id}
            title={s.title}
            meta={`${staffById(s.staffId)?.name ?? ''} · ${s.place} · ${s.status}`}
            detail={s.at}
          />
        ))}
      </Group>
    </>
  )
}

function Week() {
  const days = [
    { d: '월 10', note: '정규 외래' },
    { d: '화 11', note: 'NS conference' },
    { d: '수 12', note: '병리 슬라이드' },
    { d: '목 13', note: 'IRB' },
    { d: '금 14', note: 'Canonical day · 학회 + CODE' },
    { d: '토 15', note: '당직 교환 문의 (내과)' },
    { d: '일 16', note: '—' },
  ]
  return (
    <Group header="2025.11.10 – 16">
      {days.map((x) => (
        <div className="row static" key={x.d} style={x.d.startsWith('금') ? { background: '#e8f3f6' } : undefined}>
          <div className="row-detail">{x.d}</div>
          <div className="row-text">
            <div className="row-title">{x.note}</div>
          </div>
        </div>
      ))}
    </Group>
  )
}

function Duty({ profile, view }: { profile: UserProfile; view: (id: string) => void }) {
  const mine = DEPARTMENTS.filter((d) => d.selectable)
  return (
    <>
      <Group header={`내 과 · ${deptName(profile.departmentId)}`}>
        <div className="row static">
          <div className="row-text">
            <div className="row-title">{profile.name}</div>
            <div className="row-meta">
              {rankShort(profile.rankId)} · {dashboardDutyLabel(profile)}
            </div>
          </div>
        </div>
      </Group>
      {mine.map((d) => {
        const slots = DUTY_SLOTS.filter((s) => s.departmentId === d.id)
        const day = slots.filter((s) => s.shift === 'DAY' && (s.staffId || showUserInSlot(s, profile)))
        const night = slots.filter((s) => s.shift === 'NIGHT' && (s.staffId || showUserInSlot(s, profile)))
        return (
          <Group key={d.id} header={d.name}>
            <div className="row static">
              <div className="row-text">
                <div className="row-meta">DAY</div>
                <div className="row-title">
                  {day.map((s, i) => (
                    <Slot key={i} slot={s} user={profile} />
                  ))}
                </div>
              </div>
            </div>
            <div className="row static" onClick={() => view('duty')}>
              <div className="row-text">
                <div className="row-meta">NIGHT</div>
                <div className="row-title">
                  {night.map((s, i) => (
                    <Slot key={i} slot={s} user={profile} />
                  ))}
                </div>
              </div>
            </div>
          </Group>
        )
      })}
    </>
  )
}

function Slot({ slot, user }: { slot: DutySlot; user: UserProfile }) {
  if (slot.placeholder === 'user' && showUserInSlot(slot, user)) {
    return <div>{user.name} {rankShort(user.rankId)} · 본인</div>
  }
  if (!slot.staffId) return null
  const s = staffById(slot.staffId)
  if (!s) return null
  return (
    <div>
      <StaffName id={s.id} /> {displayTitle(s)}
    </div>
  )
}
