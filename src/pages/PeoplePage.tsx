import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { STAFF, displayTitle } from '@/data/staff'
import { DEPARTMENTS, deptName } from '@/data/departments'
import { useApp } from '@/context'
import { Screen } from '@/components/ui'
import { Segmented } from '@/components/Segmented'

export function PeoplePage() {
  const { profile, openStaff, view } = useApp()
  const [q, setQ] = useState('')
  const [params, setParams] = useSearchParams()
  const tab = (params.get('tab') as 'all' | 'fav' | 'recent') || 'all'
  const [dept, setDept] = useState('')
  const fav = profile?.favoriteStaffIds ?? []
  const viewed = profile?.viewedRecords ?? []
  const rows = useMemo(() => {
    const recentIds = [...new Set(viewed.filter((id) => id.startsWith('profile:') || id.startsWith('dir:')).map((id) => id.split(':')[1]))]
    let list = STAFF
    if (tab === 'fav') list = STAFF.filter((s) => fav.includes(s.id))
    if (tab === 'recent') list = recentIds.map((id) => STAFF.find((s) => s.id === id)).filter(Boolean) as typeof STAFF
    return list.filter((s) => {
      if (dept && s.departmentId !== dept && s.adjunctDepartmentId !== dept) return false
      if (q && !s.name.includes(q) && !s.employeeNo.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [q, dept, tab, fav, viewed])
  if (!profile) return null

  return (
    <Screen title="People" large>
      <input className="search" placeholder="이름 / 사번" value={q} onChange={(e) => setQ(e.target.value)} />
      <Segmented
        value={tab}
        onChange={(v) => setParams(v === 'all' ? {} : { tab: v })}
        options={[
          { id: 'all', label: '직원' },
          { id: 'fav', label: '즐겨찾기' },
          { id: 'recent', label: '최근' },
        ]}
      />
      {tab === 'all' ? (
        <select className="search" value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="">전체 부서</option>
          {DEPARTMENTS.filter((d) => d.group !== 'admin').map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      ) : null}

      <div className="group">
        <div className="group-body">
          {rows.length === 0 ? (
            <div className="row static">
              <div className="row-text">
                <div className="row-meta">해당하는 직원이 없습니다.</div>
              </div>
            </div>
          ) : (
            rows.map((s) => (
              <button
                key={s.id}
                className="row"
                onClick={() => {
                  view(s.isMain ? `profile:${s.id}` : `dir:${s.id}`)
                  openStaff(s.id)
                }}
              >
                {s.photo ? <img className="avatar" src={s.photo} alt="" /> : <div className="avatar" />}
                <div className="row-text">
                  <div className="row-title">{s.name}</div>
                  <div className="row-meta">
                    {deptName(s.departmentId)} · {displayTitle(s)}
                    {s.status ? ` · ${s.status}` : ''}
                  </div>
                </div>
                <span className="chev">›</span>
              </button>
            ))
          )}
        </div>
      </div>
    </Screen>
  )
}
