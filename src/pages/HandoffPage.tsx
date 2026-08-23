import { useState } from 'react'
import { HANDOFFS } from '@/data/handoffs'
import { deptName } from '@/data/departments'
import { staffById } from '@/data/staff'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'
import { hm } from '@/lib/time'

export function HandoffPage() {
  const { view } = useApp()
  const [open, setOpen] = useState<string | null>(HANDOFFS[0]?.id ?? null)
  const active = HANDOFFS.find((h) => h.id === open)
  return (
    <Screen title="인계" back="/more">
      <p className="faint" style={{ marginTop: 0 }}>
        가상 환자 · 이니셜/병실만 표시
      </p>
      <Group header="병동">
        {HANDOFFS.map((h) => (
          <Row
            key={h.id}
            title={`${h.ward} ${h.room}`}
            meta={`${deptName(h.departmentId)} · ${staffById(h.authorId)?.name ?? ''}${h.modifiedAt ? ` · ${hm(h.modifiedAt)}` : ''}`}
            detail={hm(h.at)}
            onClick={() => {
              setOpen(h.id)
              view(`handoff:${h.id}`)
            }}
          />
        ))}
      </Group>
      {active ? (
        <Group header={`${active.ward} ${active.room}`}>
          <pre className="record">{active.body}</pre>
          {active.modifiedBy && active.modifiedBy !== active.authorId ? (
            <p className="faint" style={{ padding: '0 4px' }}>
              수정 {staffById(active.modifiedBy)?.name}
            </p>
          ) : null}
        </Group>
      ) : null}
    </Screen>
  )
}

export function WardPage() {
  const rows = [
    { ward: '7W', dept: '소아청소년과', occ: '38/40', note: '714 lab pending' },
    { ward: '8W', dept: '내과 overflow', occ: '41/42', note: 'ER 입원 1 대기' },
    { ward: '9W', dept: '내과', occ: '44/44', note: '배정 지연 06:21' },
    { ward: '10W', dept: '신경외과', occ: '36/40', note: 'ICU stepdown 문의' },
    { ward: '11W', dept: '정형외과', occ: '33/36', note: '' },
    { ward: 'ER', dept: '응급의학과', occ: '대기 31', note: 'CODE Bay 2 06:37' },
  ]
  return (
    <Screen title="병동" back="/more">
      <Group header="가동">
        {rows.map((r) => (
          <Row key={r.ward} title={r.ward} meta={`${r.dept}${r.note ? ` · ${r.note}` : ''}`} detail={r.occ} />
        ))}
      </Group>
    </Screen>
  )
}
