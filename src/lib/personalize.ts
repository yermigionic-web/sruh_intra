import { frequentConsult, relationTo, sameDept } from '@/lib/hierarchy'
import {
  binLine,
  binReply,
  chaeLine,
  chaeReply,
  eunsungLine,
  eunsungReply,
  harimLine,
  harimReply,
  jeongheeLine,
  jeongheeReply,
  jiwanLine,
  jiwanReply,
  sionLine,
  sionReply,
  yoonLine,
  yoonReply,
} from '@/lib/messageLines'
import { staffById } from '@/data/staff'
import type { ChatThread, PagerThread, UserProfile } from '@/types'

function harimToUser(user: UserProfile): string {
  const rel = relationTo(user, staffById('park-harim'))
  if (user.departmentId === 'ns') {
    if (rel === 'below') return '718호 CT 아직이면 직접 전화해서 당겨요. 오전 케이스 들어가기 전에 볼게요.'
    if (rel === 'peer') return 'CT 떴으면 같이 봐요. OR는 아직 잡지 말고요.'
    return '교수님, 오전에 말씀하신 환자 MRI 확인했습니다. 내일 conference 때 같이 올리겠습니다.'
  }
  if (user.departmentId === 'em') {
    return rel === 'above'
      ? '교수님, CTA는 제가 한번 봤습니다. 시간 되시면 ER로 오시겠어요.'
      : 'CT 올렸죠? OR부터 잡지 말고 기다려요. 내려갑니다.'
  }
  if (user.departmentId === 'im') {
    return 'consult 확인했습니다. 항응고제 중단 여부 먼저 정리해서 다시 보내주세요.'
  }
  if (user.departmentId === 'rad') {
    if (rel === 'above') return '교수님, 04:47 ER 환자 영상 한번 같이 봐주실 수 있으세요.'
    return '아까 CTA 제가 한번 봤는데 애매해서요. 시간 되시면 같이 보시죠.'
  }
  if (rel === 'above') return '교수님, 협진 확인했습니다. 오전에 결과 올리겠습니다.'
  return 'pager 확인했습니다. 급하면 내선 7314.'
}

function binToUser(user: UserProfile): string {
  const rel = relationTo(user, staffById('kang-bin'))
  if (user.departmentId === 'rad') {
    return rel === 'below'
      ? '선생님 Brain CT 하나 올라갔어요. 갑자기 mental 떨어져서요. 먼저 한번 봐주실 수 있어요?'
      : 'Brain CT STAT입니다. 판독 먼저 부탁드립니다.'
  }
  if (user.departmentId === 'ns') return 'CT 올렸습니다. 선생님 오시기 전에 CTA 추가될 수 있어요.'
  if (user.departmentId === 'em') {
    return rel === 'above' ? '교수님 Bay 쪽 대기 밀렸습니다. 지시 주시면 정리하겠습니다.' : '사인 그거 나중에. 애부터.'
  }
  if (user.departmentId === 'im') return '입원 한 명 더. 병상만 찍어주세요.'
  return rel === 'above' ? '교수님 ER입니다. 급하면 내선 9112요.' : 'ER입니다. 급하면 직접 내려오세요.'
}

function jiwanToUser(user: UserProfile): string {
  const rel = relationTo(user, staffById('kim-jiwan'))
  if (user.departmentId === 'ped') {
    if (rel === 'below') return '그거 왜 아직 안 했어요. 보호자 오기 전에 차트 고치세요.'
    return '인계는 내가 고친 걸로. 퇴원 얘기는 말고.'
  }
  if (rel === 'above') return '교수님, 소아 쪽은 제가 보겠습니다. 결과는 오후에.'
  return '애들 나가면 봅시다. 성인 차트는 짧게.'
}

function yoonToUser(user: UserProfile): string {
  const rel = relationTo(user, staffById('oh-yoonkyung'))
  if (user.departmentId === 'os') {
    return rel === 'below' ? '일정은 임 선생한테 물어라. 나는 OR.' : 'THA 08:40이다. 회의 끝나고.'
  }
  if (user.departmentId === 'rad') {
    return rel === 'below'
      ? 'Knee MRI 그거 내가 생각한 거하고 좀 다른데. 시간 되나?'
      : 'Knee MRI, 시간 되면 한번 봅시다.'
  }
  return '수술은 정시다. 다른 건 레지던트한테.'
}

function sionToUser(user: UserProfile): string {
  if (user.departmentId === 'im') return '병상 문의는 원무 말고 나. 지금은 8W.'
  if (user.departmentId === 'em') return '내려가. 내가 연다.'
  return '당직 교환은 게시판에 써요. 여기로 말고.'
}

function jeongheeToUser(user: UserProfile): string {
  if (user.departmentId === 'rad') return '치료계획 CT 3건은 내가 넣을게. 너는 선우 교수님 슬라이드만.'
  return '서류는 양식 있으면 그걸로 올려 주세요. 제가 볼게요.'
}

function eunsungToUser(user: UserProfile): string {
  const rel = relationTo(user, staffById('jeong-eunsung'))
  if (user.departmentId === 'path') {
    return rel === 'below' ? '말하지 말고, 조직의 움직임을 봐요.' : '초안은 오후에. frozen은 내선.'
  }
  return 'preliminary는 10시 이후. 급하면 내선 3901.'
}

function chaeToUser(user: UserProfile): string {
  if (user.departmentId === 'an') return 'prototype은 IRB 번호 그대로. 만지려면 기록 남기세요.'
  return '장비 설명은 오후에. 매뉴얼보다 제가 하는 게 빨라요.'
}

export function personalizedPagers(user: UserProfile): PagerThread[] {
  const threads: PagerThread[] = []
  const me = 'user'

  const push = (
    id: string,
    from: string,
    fromDept: string,
    subject: string,
    text: string,
    extra?: Partial<PagerThread>,
  ) => {
    threads.push({
      id,
      at: extra?.at ?? '06:08:00',
      fromStaffId: from,
      fromDeptId: fromDept,
      toStaffId: me,
      toDeptId: user.departmentId,
      priority: extra?.priority ?? 'URGENT',
      subject,
      sent: extra?.sent ?? extra?.at ?? '06:08:00',
      delivered: extra?.delivered,
      read: extra?.read,
      messages: [{ at: extra?.at ?? '06:08:00', staffId: from, text }],
      personalized: true,
      ...extra,
    })
  }

  if (user.departmentId === 'ns' || frequentConsult(user.departmentId, 'ns')) {
    push('pg-u-harim', 'park-harim', 'ns', 'consult / imaging', harimToUser(user), {
      at: '06:11:00',
      sent: '06:11:00',
      delivered: '06:11:08',
      priority: user.departmentId === 'em' ? 'URGENT' : 'ROUTINE',
    })
  }
  if (user.departmentId === 'em' || user.departmentId === 'rad' || user.departmentId === 'im') {
    push('pg-u-bin', 'kang-bin', 'em', user.departmentId === 'rad' ? 'Brain CT / mental change' : 'ER', binToUser(user), {
      at: '04:48:00',
      sent: '04:48:00',
      delivered: '04:48:06',
      priority: 'STAT',
    })
  }
  if (user.departmentId === 'ped' || sameDept(user, staffById('kim-jiwan'))) {
    push('pg-u-jiwan', 'kim-jiwan', 'ped', 'handoff', jiwanToUser(user), {
      at: '06:14:00',
      sent: '06:14:00',
      delivered: '06:14:04',
      priority: 'ROUTINE',
    })
  }
  if (user.departmentId === 'os' || user.departmentId === 'rad') {
    push('pg-u-oh', 'oh-yoonkyung', 'os', user.departmentId === 'rad' ? 'Knee MRI' : 'OR 03', yoonToUser(user), {
      at: '06:05:00',
      sent: '06:05:00',
      delivered: '06:06:40',
      priority: 'ROUTINE',
    })
  }
  if (user.departmentId === 'im' || user.departmentId === 'em') {
    push('pg-u-sion', 'kim-sion', 'im', 'bed / 9W', sionToUser(user), {
      at: '06:27:00',
      sent: '06:27:00',
      delivered: '06:27:09',
      priority: 'URGENT',
    })
  }
  if (user.departmentId === 'rad') {
    push('pg-u-jh', 'yoo-jeonghee', 'rad', 'schedule', jeongheeToUser(user), {
      at: '06:16:00',
      sent: '06:16:00',
      delivered: '06:16:03',
      priority: 'ROUTINE',
    })
  }
  if (user.departmentId === 'path' || user.departmentId === 'ns') {
    push('pg-u-es', 'jeong-eunsung', 'path', 'prelim', eunsungToUser(user), {
      at: '05:55:00',
      sent: '05:55:00',
      delivered: '05:57:20',
      priority: 'ROUTINE',
    })
  }
  if (user.departmentId === 'an' || user.departmentId === 'os') {
    push('pg-u-ch', 'lee-chaehyung', 'bme', 'device / OR', chaeToUser(user), {
      at: '06:01:00',
      sent: '06:01:00',
      delivered: '06:01:30',
      priority: 'ROUTINE',
    })
  }

  return threads
}

export function personalizedMessages(user: UserProfile): ChatThread[] {
  return [
    {
      id: 'msg-u-harim',
      staffId: 'park-harim',
      lastSeen: '06:11',
      personalized: true,
      messages: [
        { id: 'um-h1', at: '06:11:00', fromStaffId: 'park-harim', text: harimLine(user) },
        { id: 'um-h2', at: '06:12:00', fromStaffId: 'user', text: harimReply(user) },
      ],
    },
    {
      id: 'msg-u-bin',
      staffId: 'kang-bin',
      lastSeen: '06:40',
      personalized: true,
      messages: [
        { id: 'um-b1', at: '06:06:00', fromStaffId: 'kang-bin', text: binLine(user) },
        { id: 'um-b2', at: '06:07:00', fromStaffId: 'user', text: binReply(user) },
      ],
    },
    {
      id: 'msg-u-jh',
      staffId: 'yoo-jeonghee',
      lastSeen: '06:16',
      personalized: true,
      messages: [
        { id: 'um-j1', at: '06:16:00', fromStaffId: 'yoo-jeonghee', text: jeongheeLine(user) },
        { id: 'um-j2', at: '06:17:00', fromStaffId: 'user', text: jeongheeReply(user) },
      ],
    },
    {
      id: 'msg-u-jiwan',
      staffId: 'kim-jiwan',
      lastSeen: '06:14',
      personalized: true,
      messages: [
        { id: 'um-w1', at: '06:13:00', fromStaffId: 'kim-jiwan', text: jiwanLine(user) },
        { id: 'um-w2', at: '06:14:00', fromStaffId: 'user', text: jiwanReply(user) },
      ],
    },
    {
      id: 'msg-u-yoon',
      staffId: 'oh-yoonkyung',
      lastSeen: '06:05',
      personalized: true,
      messages: [
        { id: 'um-y1', at: '06:04:00', fromStaffId: 'oh-yoonkyung', text: yoonLine(user) },
        { id: 'um-y2', at: '06:05:00', fromStaffId: 'user', text: yoonReply(user) },
      ],
    },
    {
      id: 'msg-u-sion',
      staffId: 'kim-sion',
      lastSeen: '06:27',
      personalized: true,
      messages: [
        { id: 'um-s1', at: '06:26:00', fromStaffId: 'kim-sion', text: sionLine(user) },
        { id: 'um-s2', at: '06:27:00', fromStaffId: 'user', text: sionReply(user) },
      ],
    },
    {
      id: 'msg-u-es',
      staffId: 'jeong-eunsung',
      lastSeen: '05:57',
      personalized: true,
      messages: [
        { id: 'um-e1', at: '05:55:00', fromStaffId: 'jeong-eunsung', text: eunsungLine(user) },
        { id: 'um-e2', at: '05:56:00', fromStaffId: 'user', text: eunsungReply(user) },
      ],
    },
    {
      id: 'msg-u-ch',
      staffId: 'lee-chaehyung',
      lastSeen: '06:02',
      personalized: true,
      messages: [
        { id: 'um-c1', at: '06:01:00', fromStaffId: 'lee-chaehyung', text: chaeLine(user) },
        { id: 'um-c2', at: '06:02:00', fromStaffId: 'user', text: chaeReply(user) },
      ],
    },
  ]
}

export function dashboardDutyLabel(user: UserProfile): string {
  const nightDepts = ['em', 'im', 'ns', 'os', 'ped', 'rad', 'an', 'path']
  if (nightDepts.includes(user.departmentId) && ['intern', 'r1', 'r2', 'r3', 'r4'].includes(user.rankId)) {
    return '18:00–익일 08:00'
  }
  if (['f1', 'f2'].includes(user.rankId)) return 'DAY 08:00–18:00 / on-call'
  return '외래·회의 일정 참조'
}

export function todoItems(user: UserProfile): { label: string; due: string }[] {
  const band = user.rankId
  const d = user.departmentId
  if (['intern', 'r1', 'r2', 'r3', 'r4'].includes(band)) {
    if (d === 'rad') {
      return [
        { label: 'STAT Brain CT prelim 보고', due: '04:54' },
        { label: 'CTA staff review 보조', due: '05:02' },
        { label: 'Portable chest 06:39', due: '06:39' },
        { label: '야간 판독 큐 잔여 확인', due: '07:00' },
        { label: '교수 보고 (선우진)', due: '08:00' },
      ]
    }
    if (d === 'em') {
      return [
        { label: 'NS consult 경과 확인', due: '05:08' },
        { label: '내과 병상 8W 확인', due: '05:25' },
        { label: 'CODE Bay 2', due: '06:37' },
        { label: '대기 환자 재분류', due: '06:50' },
      ]
    }
    return [
      { label: '미확인 호출 확인', due: '06:42' },
      { label: '인계문 대조', due: '07:00' },
      { label: '교수 지시 사항 회신', due: '08:00' },
      { label: '당직 인수인계', due: '08:00' },
    ]
  }
  if (['f1', 'f2'].includes(band)) {
    if (d === 'rad') {
      return [
        { label: '레지던트 prelim 확인', due: '07:30' },
        { label: '근골격 MRI 큐', due: '09:00' },
        { label: 'Angio standby', due: '07:00' },
      ]
    }
    return [
      { label: '협진 정리', due: '08:00' },
      { label: '레지던트 기록 확인', due: '08:30' },
      { label: '학회 자료', due: '09:00' },
    ]
  }
  return [
    { label: '교수진 오전 회의', due: '08:05' },
    { label: '결재 대기 확인', due: '09:00' },
    { label: '학회 / 연자', due: '09:00' },
    { label: '후배 판독·수술 확인', due: '12:00' },
  ]
}
