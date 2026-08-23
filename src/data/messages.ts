import type { ChatThread } from '@/types'

export const MESSAGE_THREADS: ChatThread[] = [
  {
    id: 'msg-lim-oh',
    staffId: 'lim-doyoon',
    lastSeen: '06:18',
    messages: [
      { id: 'm1', at: '05:58:00', fromStaffId: 'lim-doyoon', text: '교수님 오늘 오전 회의 08:05입니다.' },
      { id: 'm2', at: '06:02:00', fromStaffId: 'oh-yoonkyung', text: '알고 있다' },
      { id: 'm3', at: '06:14:00', fromStaffId: 'lim-doyoon', text: '의사증은 데스크에 있습니다.' },
      { id: 'm4', at: '06:16:00', fromStaffId: 'oh-yoonkyung', text: '그거 새로 뽑았다' },
    ],
  },
  {
    id: 'msg-cho-harim',
    staffId: 'cho-yuna',
    lastSeen: '05:40',
    messages: [
      { id: 'm5', at: '05:11:00', fromStaffId: 'cho-yuna', text: '선생님 CTA 올라왔습니다. 선우 교수님 호출할까요?' },
      { id: 'm6', at: '05:12:00', fromStaffId: 'park-harim', text: '내가 했어요. OR prep 그대로.' },
    ],
  },
  {
    id: 'msg-bang-jiwan',
    staffId: 'bang-yewon',
    lastSeen: '06:51',
    messages: [
      { id: 'm7', at: '06:48:00', fromStaffId: 'bang-yewon', text: '인계 714 제가 다시 적었습니다.' },
      { id: 'm8', at: '06:51:00', fromStaffId: 'kim-jiwan', text: '내가 고쳤으니 그 버전으로.' },
    ],
  },
  {
    id: 'msg-wi-jeonghee',
    staffId: 'wi-soram',
    lastSeen: '06:22',
    messages: [
      { id: 'm9', at: '06:09:00', fromStaffId: 'wi-soram', text: '선배 치료계획 CT 3건 원무에서 또 밀렸어요.' },
      { id: 'm10', at: '06:11:00', fromStaffId: 'yoo-jeonghee', text: '내가 넣을게. 너는 선우 교수님 슬라이드만 봐.' },
    ],
  },
  {
    id: 'msg-sion-bin',
    staffId: 'kim-sion',
    lastSeen: '06:40',
    messages: [
      { id: 'm11', at: '05:28:00', fromStaffId: 'kim-sion', text: '병상 내가 말했어. 8W.' },
      { id: 'm12', at: '05:29:00', fromStaffId: 'kang-bin', text: 'ㅇㅋ' },
      { id: 'm13', at: '06:40:00', fromStaffId: 'kang-bin', text: '내려와' },
    ],
  },
  {
    id: 'msg-ma-chae',
    staffId: 'lee-chaehyung',
    lastSeen: '01:14',
    messages: [
      { id: 'm14', at: '01:02:00', fromStaffId: 'ma-junho', text: '선생님 prototype 신청서 항목 17번 비었습니다.' },
      { id: 'm15', at: '01:14:00', fromStaffId: 'lee-chaehyung', text: '고쳐서 넣었음. IRB 번호는 그대로.' },
    ],
  },
  {
    id: 'msg-yang-eunsung',
    staffId: 'jeong-eunsung',
    lastSeen: '04:03',
    messages: [
      { id: 'm16', at: '03:41:00', fromStaffId: 'yang-sebin', text: '교수님 초안 각주 라틴어 맞는지 확인 부탁드립니다.' },
      { id: 'm17', at: '04:03:00', fromStaffId: 'jeong-eunsung', text: '그대로 두세요. 오후에 봅시다.' },
    ],
  },
]
