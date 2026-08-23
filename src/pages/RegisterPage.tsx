import { useState } from 'react'
import { APP_NAME, HOSPITAL_ADDRESS, HOSPITAL_NAME, HOSPITAL_NAME_EN, NAME_EXAMPLE, STAFF_SERVICES } from '@/brand'
import { SELECTABLE_DEPARTMENTS } from '@/data/departments'
import { ranksForDepartment } from '@/data/ranks'
import { rankLabel } from '@/lib/hierarchy'
import { useApp } from '@/context'
import type { RankId } from '@/types'

export function RegisterPage() {
  const { register } = useApp()
  const [name, setName] = useState('')
  const [departmentId, setDepartmentId] = useState('em')
  const [rankId, setRankId] = useState<RankId>('r2')
  const ranks = ranksForDepartment(departmentId)

  return (
    <div className="onboard">
      <div className="onboard-card">
        <img src="/sruhlogo.png" alt="" />
        <div className="kicker">{HOSPITAL_NAME}</div>
        <h1>{STAFF_SERVICES}</h1>
        <p className="lead">직원 정보를 설정해 주세요.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const n = name.trim()
            if (!n) return
            register({
              name: n,
              gender: 'F',
              departmentId,
              rankId,
              registeredAt: new Date().toISOString(),
              sessionDay: '2025-11-14',
              readMessages: [],
              readPagers: [],
              viewedRecords: [],
              archiveUnlocked: false,
              archiveHint: false,
              favoriteStaffIds: [],
            })
          }}
        >
          <label>
            이름
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} required placeholder={`예: ${NAME_EXAMPLE}`} />
          </label>
          <label>
            소속
            <select
              value={departmentId}
              onChange={(e) => {
                const id = e.target.value
                setDepartmentId(id)
                const next = ranksForDepartment(id)
                if (!next.includes(rankId)) setRankId(next[0])
              }}
            >
              {SELECTABLE_DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            직급
            <select value={rankId} onChange={(e) => setRankId(e.target.value as RankId)}>
              {ranks.map((id) => (
                <option key={id} value={id}>
                  {rankLabel(id)}
                </option>
              ))}
            </select>
          </label>
          <p className="faint" style={{ margin: '0 0 8px' }}>
            성별은 직원 마스터 기준 여성으로 등록됩니다.
          </p>
          <button className="btn-continue" type="submit">
            계속
          </button>
        </form>
        <div className="onboard-foot">
          {HOSPITAL_ADDRESS}
          <br />
          {HOSPITAL_NAME_EN}
          <br />
          {APP_NAME}
        </div>
      </div>
    </div>
  )
}
