import type { Department } from '@/types'

export const DEPARTMENTS: Department[] = [
  { id: 'em', name: '응급의학과', short: 'EM', selectable: true, group: 'clinical' },
  { id: 'im', name: '내과', short: 'IM', selectable: true, group: 'clinical' },
  { id: 'ns', name: '신경외과', short: 'NS', selectable: true, group: 'clinical' },
  { id: 'os', name: '정형외과', short: 'OS', selectable: true, group: 'clinical' },
  { id: 'ped', name: '소아청소년과', short: 'PED', selectable: true, group: 'clinical' },
  { id: 'rad', name: '영상의학과', short: 'RAD', selectable: true, group: 'support' },
  { id: 'path', name: '병리과', short: 'PATH', selectable: true, group: 'support' },
  { id: 'an', name: '마취통증의학과', short: 'AN', selectable: true, group: 'clinical' },
  { id: 'obgyn', name: '산부인과', short: 'OB', selectable: true, group: 'clinical' },
  { id: 'ent', name: '이비인후과', short: 'ENT', selectable: true, group: 'clinical' },
  { id: 'bme', name: '의공학연구센터', short: 'BME', selectable: false, group: 'support' },
  { id: 'nursing', name: '간호본부', short: 'NSG', selectable: false, group: 'admin' },
  { id: 'admin', name: '원무팀', short: 'ADM', selectable: false, group: 'admin' },
  { id: 'or', name: '중앙수술실', short: 'OR', selectable: false, group: 'admin' },
  { id: 'nutrition', name: '영양팀', short: 'NUT', selectable: false, group: 'admin' },
  { id: 'facility', name: '시설팀', short: 'FAC', selectable: false, group: 'admin' },
]

export function dept(id: string) {
  return DEPARTMENTS.find((d) => d.id === id)
}

export function deptName(id: string) {
  return dept(id)?.name ?? id
}

export function deptShort(id: string) {
  return dept(id)?.short ?? id.toUpperCase()
}

export const SELECTABLE_DEPARTMENTS = DEPARTMENTS.filter((d) => d.selectable)
