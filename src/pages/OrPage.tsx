import { SURGERIES, OR_NOTE } from '@/data/surgeries'
import { deptName } from '@/data/departments'
import { staffById } from '@/data/staff'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'

export function OrPage() {
  const { view } = useApp()
  return (
    <Screen title="수술실" back="/more">
      <p className="faint" style={{ marginTop: 0 }}>
        중앙수술실 / Angio · 06:41
      </p>
      <Group header="진행 · 예정">
        {SURGERIES.map((s) => {
          const st = staffById(s.surgeonId)
          return (
            <Row
              key={s.id}
              title={`${s.or} · ${s.procedure}`}
              meta={`${deptName(s.departmentId)} · ${st?.name ?? ''} · ${s.status}${OR_NOTE[s.id] ? ` · ${OR_NOTE[s.id]}` : ''}`}
              detail={s.start}
              onClick={() => view(`or:${s.id}`)}
            />
          )
        })}
      </Group>
      <p className="faint">Angio는 중앙수술실과 별도 운영. 점검 공지는 직원게시판.</p>
    </Screen>
  )
}
