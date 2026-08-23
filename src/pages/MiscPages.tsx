import { useState } from 'react'
import { CONFERENCES, PAPERS } from '@/data/academic'
import { APPROVALS } from '@/data/approvals'
import { ARCHIVE_RECORDS } from '@/data/archive'
import { deptName } from '@/data/departments'
import { rankShort } from '@/lib/hierarchy'
import { hm } from '@/lib/time'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'
import { staffById } from '@/data/staff'

export function AcademicPage() {
  const { view } = useApp()
  return (
    <Screen title="학회 / 세미나" back="/more">
      <Group header="금일">
        {CONFERENCES.map((c) => (
          <Row
            key={c.id}
            title={c.title}
            meta={`${c.place}${c.note ? ` · ${c.note}` : ''} · ${c.speakers.map((id) => staffById(id)?.name).filter(Boolean).join(', ')}`}
            detail={c.end ? `${c.at}–${c.end}` : c.at}
            onClick={() => view(`conf:${c.id}`)}
          />
        ))}
      </Group>
    </Screen>
  )
}

export function ResearchPage() {
  return (
    <Screen title="연구" back="/more">
      <Group header="IRB">
        <Row
          title="IRB 2025-AN-441"
          meta="이채형 신청 · 11:12 반려 / 11:19 수정 / 11:21 승인"
          to="/more/approvals"
        />
      </Group>
      <p className="faint">규정 비고는 게시판, 결재 본문은 전자결재.</p>
    </Screen>
  )
}

export function PapersPage() {
  return (
    <Screen title="논문실적" back="/more">
      <Group>
        {PAPERS.map((p) => (
          <Row
            key={p.title}
            title={p.title}
            meta={`${staffById(p.staffId)?.name ?? ''} · ${p.role} · ${p.venue}`}
            detail={p.date}
          />
        ))}
      </Group>
    </Screen>
  )
}

export function RoomsPage() {
  const rooms = [
    { id: 'A', place: '3F 회의실 A', at: '08:05–08:50', title: '교수진 오전 회의', note: '08:17 추가 입실' },
    { id: 'H', place: '중앙홀', at: '09:00–12:30', title: 'Cerebrovascular Symposium', note: '' },
    { id: 'S', place: '5F 세미나실', at: '13:44–14:20', title: '외과-내과 conference', note: '' },
    { id: 'P', place: '병리 세미나실', at: '17:30–18:30', title: '슬라이드 리뷰', note: '' },
  ]
  return (
    <Screen title="회의실" back="/more">
      <Group header="11/14">
        {rooms.map((r) => (
          <Row key={r.id} title={r.title} meta={`${r.place}${r.note ? ` · ${r.note}` : ''}`} detail={r.at} />
        ))}
      </Group>
    </Screen>
  )
}

export function ApprovalsPage() {
  const { view } = useApp()
  return (
    <Screen title="전자결재" back="/more">
      <Group>
        {APPROVALS.map((a) => (
          <Row
            key={a.id + a.at}
            title={a.title}
            meta={`${staffById(a.requesterId)?.name ?? ''} · ${a.status}${a.note ? ` · ${a.note}` : ''}`}
            detail={a.at.includes('T') ? a.at.slice(5, 16).replace('T', ' ') : hm(a.at)}
            onClick={() => view(`ap:${a.id}`)}
          />
        ))}
      </Group>
    </Screen>
  )
}

export function RecentPage() {
  const { profile } = useApp()
  if (!profile) return null
  return (
    <Screen title="최근 열람" back="/more">
      <Group>
        {profile.viewedRecords.length === 0 ? (
          <div className="row static">
            <div className="row-text">
              <div className="row-meta">열람 기록이 없습니다.</div>
            </div>
          </div>
        ) : (
          profile.viewedRecords.map((id) => (
            <Row key={id} title={id} />
          ))
        )}
      </Group>
    </Screen>
  )
}

export function SettingsPage() {
  const { profile, reset } = useApp()
  if (!profile) return null
  return (
    <Screen title="직원 프로필" back="/more">
      <Group header="등록 정보">
        <Row title="이름" detail={profile.name} />
        <Row title="성별" detail="여성" />
        <Row title="소속" detail={deptName(profile.departmentId)} />
        <Row title="직급" detail={rankShort(profile.rankId)} />
        <Row title="세션일" detail={profile.sessionDay} />
      </Group>
      <button
        className="btn-reset"
        onClick={() => {
          if (confirm('직원 프로필을 초기화하고 등록 화면으로 돌아갑니다.')) reset()
        }}
      >
        직원 프로필 초기화
      </button>
    </Screen>
  )
}

export function ArchivePage() {
  const { profile, view } = useApp()
  const [open, setOpen] = useState<string | null>(null)
  if (!profile) return null
  if (!profile.archiveHint && !profile.archiveUnlocked) {
    return (
      <Screen title="Archive" back="/more">
        <p className="muted">권한이 없습니다.</p>
      </Screen>
    )
  }
  const records = profile.archiveUnlocked
    ? ARCHIVE_RECORDS
    : ARCHIVE_RECORDS.filter((r) => r.id !== 'ar-50k')
  const active = records.find((r) => r.id === open) ?? records[0]
  return (
    <Screen title="Archive" back="/more">
      <p className="faint" style={{ marginTop: 0 }}>
        2025.03–
      </p>
      <Group>
        {records.map((r) => (
          <Row
            key={r.id}
            title={r.title}
            meta={`${r.kind} · ${r.at.replace('T', ' ').slice(0, 16)}`}
            onClick={() => {
              setOpen(r.id)
              view(`ar:${r.id}`)
            }}
          />
        ))}
      </Group>
      {active ? (
        <Group header={active.title}>
          <pre className="record">{active.body}</pre>
          {active.staffIds.length ? (
            <p className="faint" style={{ padding: '8px 4px 0' }}>
              {active.staffIds.map((id) => staffById(id)?.name).filter(Boolean).join(' · ')}
            </p>
          ) : null}
        </Group>
      ) : null}
    </Screen>
  )
}
