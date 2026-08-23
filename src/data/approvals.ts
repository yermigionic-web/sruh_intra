import type { ApprovalItem } from '@/types'

export const APPROVALS: ApprovalItem[] = [
  {
    id: 'ap-1112',
    at: '11:12:00',
    title: '신형 주입펌프 prototype 임상 사용 신청',
    requesterId: 'lee-chaehyung',
    status: '반려',
    note: 'IRB 첨부 누락 / 적용 장소 Angio 2 점검 시간과 충돌',
  },
  {
    id: 'ap-1119',
    at: '11:19:00',
    title: '신형 주입펌프 prototype 임상 사용 신청 (수정)',
    requesterId: 'lee-chaehyung',
    status: '재신청',
    note: 'IRB 2025-AN-441 첨부. 장소 Angio 1.',
  },
  {
    id: 'ap-1121',
    at: '11:21:00',
    title: '신형 주입펌프 prototype 임상 사용 신청 (수정)',
    requesterId: 'lee-chaehyung',
    status: '승인',
    note: '결재: 노현석 교수',
  },
  {
    id: 'ap-duty',
    at: '18:42:00',
    title: '내과 당직 변경 신청 (11/15)',
    requesterId: 'kim-sion',
    status: '대기',
    note: '대체 인력 미지정',
  },
  {
    id: 'ap-leave-ns',
    at: '2025-11-12T09:40:00+09:00',
    title: '연차 신청 — 조유나 R4',
    requesterId: 'cho-yuna',
    status: '반려',
    note: '11월 당직표 미충족',
  },
]
