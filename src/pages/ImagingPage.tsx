import { IMAGING_STUDIES, IMAGING_SUMMARY } from '@/data/imaging'
import { deptShort } from '@/data/departments'
import { staffById } from '@/data/staff'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'

export function ImagingPage() {
  const { view } = useApp()
  return (
    <Screen title="영상검사" back="/more">
      <p className="faint" style={{ marginTop: 0 }}>
        영상의학과 Reading Queue
      </p>
      <div className="metrics">
        <div className="metric">
          <div className="k">CT</div>
          <div className="v">{IMAGING_SUMMARY.ct.stat}</div>
          <div className="u">
            응급 · 진행 {IMAGING_SUMMARY.ct.active} · 대기 {IMAGING_SUMMARY.ct.wait}
          </div>
        </div>
        <div className="metric">
          <div className="k">MRI</div>
          <div className="v">{IMAGING_SUMMARY.mri.stat}</div>
          <div className="u">
            응급 · 진행 {IMAGING_SUMMARY.mri.active} · 대기 {IMAGING_SUMMARY.mri.wait}
          </div>
        </div>
      </div>
      <Group header="Queue">
        {IMAGING_STUDIES.map((s) => (
          <Row
            key={s.id}
            title={`${s.modality} ${s.exam}`}
            meta={`${deptShort(s.fromDeptId)} · ${s.status}${s.assignedId ? ` · ${staffById(s.assignedId)?.name ?? ''}` : ''}`}
            detail={
              <>
                <span className={`pri ${s.priority}`}>{s.priority}</span> {s.at}
              </>
            }
            onClick={() => view(`img:${s.id}`)}
          />
        ))}
      </Group>
    </Screen>
  )
}
