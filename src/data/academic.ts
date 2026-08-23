import type { AcademicRecord, ConferenceItem } from '@/types'

export const CONFERENCES: ConferenceItem[] = [
  {
    id: 'cf-0805',
    at: '08:05',
    end: '08:50',
    place: '본관 3F 회의실 A',
    title: '교수진 오전 회의',
    speakers: ['kang-daewon', 'yoon-taekyung', 'cheon-woosung', 'oh-yoonkyung'],
    note: '08:17 오윤경 입실.',
    eventId: 'ev-0805-faculty',
  },
  {
    id: 'cf-0900',
    at: '09:00',
    end: '12:30',
    place: '중앙홀',
    title: 'Cerebrovascular Symposium',
    speakers: ['kang-daewon', 'seon-woojin', 'park-harim', 'jeong-eunsung'],
    note: '박하림: Emergency OR 사유 불참 처리 09:03.',
    eventId: 'ev-0900-conf',
  },
  {
    id: 'cf-1344',
    at: '13:44',
    end: '14:20',
    place: '본관 5F 세미나실',
    title: '외과-내과 치료방침 conference',
    speakers: ['oh-yoonkyung', 'lim-sua', 'park-harim', 'ryu-hangyeol'],
    note: '14:20 plan 공동 서명.',
    eventId: 'ev-1344-conf2',
  },
  {
    id: 'cf-1730',
    at: '17:30',
    end: '18:30',
    place: '병리과 세미나실',
    title: '병리 월례 슬라이드 리뷰',
    speakers: ['jeong-eunsung', 'cha-minkyung'],
  },
]

export const PAPERS: AcademicRecord[] = [
  {
    staffId: 'jeong-eunsung',
    date: '2025-10-02',
    title: 'Histologic correlates of delayed cerebral ischemia: a single-center series',
    venue: 'under review',
    role: 'corresponding',
  },
  {
    staffId: 'park-harim',
    date: '2025-09-18',
    title: 'Emergency evacuation timing in traumatic extra-axial hemorrhage',
    venue: '대한신경외과학회',
    role: 'first',
  },
  {
    staffId: 'oh-yoonkyung',
    date: '2025-08-11',
    title: 'Cementless THA in osteoporotic acetabulum',
    venue: 'Clin Orthop Surg',
    role: 'corresponding',
  },
  {
    staffId: 'lee-chaehyung',
    date: '2025-11-02',
    title: 'Closed-loop infusion pump prototype: bench to IRB',
    venue: 'internal technical note',
    role: 'PI',
  },
  {
    staffId: 'seon-woojin',
    date: '2025-07-21',
    title: 'CTA pitfalls in hyperacute ICH',
    venue: '대한영상의학회',
    role: 'corresponding',
  },
  {
    staffId: 'kim-jiwan',
    date: '2025-06-04',
    title: 'Fever without source, overnight decision rules',
    venue: '소아감염',
    role: 'corresponding',
  },
]
