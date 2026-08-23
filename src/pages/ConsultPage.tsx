import { CONSULTS } from '@/data/consults'
import { deptShort } from '@/data/departments'
import { staffById } from '@/data/staff'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'

export function ConsultPage() {
  const { view } = useApp()
  const live = CONSULTS.filter((c) => c.status === '미확인' || c.status === '진행')
  const rest = CONSULTS.filter((c) => c.status !== '미확인' && c.status !== '진행')
  return (
    <Screen title="응급협진" back="/more">
      <Group header="지금">
        {live.map((c) => (
          <Row
            key={c.id}
            title={c.subject}
            meta={`${deptShort(c.fromDeptId)} ${staffById(c.fromStaffId)?.name ?? ''} → ${deptShort(c.toDeptId)} ${c.toStaffId ? staffById(c.toStaffId)?.name ?? '' : '—'}`}
            detail={
              <>
                <span className={`pri ${c.priority}`}>{c.priority}</span> {c.at}
              </>
            }
            onClick={() => view(`consult:${c.id}`)}
          />
        ))}
      </Group>
      {rest.length ? (
        <Group header="확인됨">
          {rest.map((c) => (
            <Row
              key={c.id}
              title={c.subject}
              meta={`${c.status} · ${staffById(c.fromStaffId)?.name ?? ''}`}
              detail={c.at}
              onClick={() => view(`consult:${c.id}`)}
            />
          ))}
        </Group>
      ) : null}
    </Screen>
  )
}
