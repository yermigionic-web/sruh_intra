import { deptName } from '@/data/departments'
import { displayTitle, staffById } from '@/data/staff'
import { useApp } from '@/context'

export function StaffName({ id, withDept = false }: { id: string; withDept?: boolean }) {
  const { openStaff } = useApp()
  if (id === 'user') {
    const { profile } = useApp()
    return <span>{profile?.name ?? '본인'}</span>
  }
  const s = staffById(id)
  if (!s) return <span>{id}</span>
  const label = withDept ? `${s.name} ${displayTitle(s)}` : s.name
  return (
    <button type="button" className="staff-link" onClick={() => openStaff(s.id)} title={`${deptName(s.departmentId)} / ${displayTitle(s)}`}>
      {label}
    </button>
  )
}

export function StaffLine({ id }: { id: string }) {
  const s = staffById(id)
  if (!s) return null
  return (
    <span>
      <StaffName id={id} /> {displayTitle(s)}
      <span className="faint"> · {deptName(s.departmentId)}</span>
    </span>
  )
}
