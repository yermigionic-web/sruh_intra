import type { UserProfile } from '@/types'

export type Seat = 'intern' | 'resident' | 'fellow' | 'ap' | 'asp' | 'prof'

export function seatOf(user: UserProfile): Seat {
  switch (user.rankId) {
    case 'intern':
      return 'intern'
    case 'r1':
    case 'r2':
    case 'r3':
    case 'r4':
      return 'resident'
    case 'f1':
    case 'f2':
      return 'fellow'
    case 'ap':
      return 'ap'
    case 'asp':
      return 'asp'
    default:
      return 'prof'
  }
}

type Lines = Record<Seat, string>

function of(user: UserProfile, table: Record<string, Lines>): string {
  return (table[user.departmentId] ?? table._)[seatOf(user)]
}

function r(user: UserProfile, lines: Lines) {
  return lines[seatOf(user)]
}

/** 박하림 — 신경외과 */
export function harimLine(user: UserProfile) {
  return of(user, {
    ns: {
      intern: '인턴, 718호 CT 떴는지 확인하고 와. 오전 케이스 전에 내가 볼게.',
      resident: '718호 CT 아직이면 직접 전화해서 당겨. 오전 케이스 들어가기 전에 볼게.',
      fellow: '718호 CT, 같이 보자. OR는 아직 잡지 말고.',
      ap: '718호 영상 시간 되면 같이 봅시다. OR는 제가 보류해 둘게요.',
      asp: '부교수님, 718호 MRI는 제가 올려 두었습니다. 오전에 한번만 봐주시겠어요.',
      prof: '교수님, 오전에 말씀하신 환자 MRI 확인했습니다. conference 때 같이 올리겠습니다.',
    },
    em: {
      intern: '인턴, ER CT 올린 거 맞지? 내려가기 전에 차트만 맞춰 둬.',
      resident: 'CT 올렸죠? OR부터 잡지 말고 기다려. 내려갑니다.',
      fellow: 'CTA는 제가 한번 봤어요. 시간 되면 ER로 오시겠어요.',
      ap: '선생님, CTA 애매해서요. ER 쪽 한번 같이 봐주시겠어요.',
      asp: '부교수님, ER 영상 제가 봤습니다. 오시면 바로 말씀드리겠습니다.',
      prof: '교수님, CTA는 제가 한번 봤습니다. 시간 되시면 ER로 오시겠어요.',
    },
    rad: {
      intern: '인턴, 아까 CTA 판독문 초안만 올려 둬. 내가 다시 볼게.',
      resident: '아까 CTA 제가 한번 봤는데 애매해서요. 시간 되면 같이 보시죠.',
      fellow: 'CTA staff review 한 번만 같이 해주실래요. 제가 잡아둘게요.',
      ap: '선생님, 04:47 ER 환자 영상 한번 같이 봐주실 수 있으세요.',
      asp: '부교수님, 그 영상 제가 우선 봐 두었습니다. 시간 되실 때 한 번만요.',
      prof: '교수님, 04:47 ER 환자 영상 한번 같이 봐주실 수 있으세요.',
    },
    im: {
      intern: '인턴, 항응고제 중단 여부 차트에 박고 다시 올려.',
      resident: 'consult 확인했어. 항응고제 중단 여부 먼저 정리해서 다시 보내.',
      fellow: '협진 봤어요. 항응고제만 정리되면 제가 오전에 회신할게요.',
      ap: '선생님, 협진 확인했습니다. 항응고제 방침만 주시면 진행할게요.',
      asp: '부교수님, 협진 확인했습니다. 오전에 결과 올리겠습니다.',
      prof: '교수님, 협진 확인했습니다. 오전에 결과 올리겠습니다.',
    },
    _: {
      intern: '인턴, pager 확인했으면 내선 7314로 와. 급하면 내가 받을게.',
      resident: 'pager 확인했어. 급하면 내선 7314.',
      fellow: '호출 확인했어요. 오전에 제가 정리해서 올리겠습니다.',
      ap: '선생님, 협진 확인했습니다. 오전에 결과 올리겠습니다.',
      asp: '부교수님, 확인했습니다. 필요하시면 오전에 보고드리겠습니다.',
      prof: '교수님, 협진 확인했습니다. 오전에 결과 올리겠습니다.',
    },
  })
}

export function harimReply(user: UserProfile) {
  return r(user, {
    intern: '확인했습니다. 차트부터 맞추겠습니다.',
    resident: '확인했습니다. OR는 잡지 않겠습니다.',
    fellow: '알겠습니다. 영상 보고 다시 올리겠습니다.',
    ap: '확인했습니다. 오전에 같이 보시죠.',
    asp: '확인했습니다. 오전에 제가 정리하겠습니다.',
    prof: '확인했습니다. 오전에 봅시다.',
  })
}

/** 강빈 — 응급의학과 */
export function binLine(user: UserProfile) {
  return of(user, {
    em: {
      intern: `${user.name} 인턴. 대기 밀렸어. 줄 서는 거 말고 바이탈부터.`,
      resident: `${user.name} 선생님. 대기 밀렸어요. 먼저 줄 서는 거 말고 바이탈.`,
      fellow: 'Bay 대기 밀렸어요. 재분류만 먼저 해주실래요.',
      ap: '선생님, Bay 쪽 대기 밀렸습니다. 지시 주시면 정리하겠습니다.',
      asp: '부교수님, 대기 밀렸습니다. 우선순위만 찍어 주시면 돌리겠습니다.',
      prof: '교수님 Bay 쪽 대기 밀렸습니다. 지시 주시면 정리하겠습니다.',
    },
    ns: {
      intern: '인턴, CT 올렸어. 선생님 오기 전에 차트만 열어 둬.',
      resident: 'CT 올렸습니다. 선생님 오시기 전에 CTA 추가될 수 있어요.',
      fellow: 'CT 올렸어요. CTA 추가될 수 있어서 미리 말합니다.',
      ap: '선생님, CT 올렸습니다. 오시기 전에 CTA 들어갈 수 있어요.',
      asp: '부교수님, CT 올렸습니다. 오시면 바로 보여드리겠습니다.',
      prof: '교수님, CT 올렸습니다. 오시면 바로 보여드리겠습니다.',
    },
    rad: {
      intern: '인턴, Brain CT 하나 올라갔어. mental 떨어져서. 초안만 올려.',
      resident: '선생님 Brain CT 하나 올라갔어요. 갑자기 mental 떨어져서요. 먼저 한번 봐주실 수 있어요?',
      fellow: 'Brain CT STAT이에요. prelim만 먼저 부탁합니다.',
      ap: '선생님, Brain CT STAT입니다. 판독 먼저 부탁드립니다.',
      asp: '부교수님, Brain CT STAT입니다. 판독 먼저 부탁드립니다.',
      prof: '교수님, Brain CT STAT입니다. 판독 먼저 부탁드립니다.',
    },
    im: {
      intern: '인턴, 입원 한 명 더. 병상 번호만 찍고 와.',
      resident: '입원 한 명 더. 병상만 찍어주세요.',
      fellow: '병상 하나 더 필요해요. 8W 쪽으로 열어줄 수 있어요?',
      ap: '선생님, 입원 한 명 더입니다. 병상만 찍어 주시면 내리겠습니다.',
      asp: '부교수님, 병상만 주시면 바로 올리겠습니다.',
      prof: '교수님, 병상만 주시면 바로 올리겠습니다.',
    },
    _: {
      intern: '인턴, ER이야. 급하면 직접 내려와. 내선 9112.',
      resident: 'ER입니다. 급하면 직접 내려오세요.',
      fellow: 'ER입니다. 급하면 내선 9112요.',
      ap: '선생님, ER입니다. 급하시면 내선 9112입니다.',
      asp: '부교수님, ER입니다. 급하시면 내선 9112요.',
      prof: '교수님 ER입니다. 급하면 내선 9112요.',
    },
  })
}

export function binReply(user: UserProfile) {
  return r(user, {
    intern: '지금 내려가겠습니다.',
    resident: '지금 내려갑니다.',
    fellow: '확인하고 바로 가겠습니다.',
    ap: '확인했습니다. 곧 내려가겠습니다.',
    asp: '확인했습니다. 오전에 정리하겠습니다.',
    prof: '확인했습니다. 지시대로 하겠습니다.',
  })
}

/** 유정희 — 영상의학과 */
export function jeongheeLine(user: UserProfile) {
  return of(user, {
    rad: {
      intern: '인턴, 치료계획 CT 3건은 내가 넣을게. 너는 슬라이드 순서만 맞춰.',
      resident: '치료계획 CT 3건은 내가 넣을게. 너는 선우 교수님 슬라이드만.',
      fellow: '치료계획 CT는 내가 넣을게. 슬라이드만 먼저 봐줘.',
      ap: '선생님, CT 3건은 제가 넣을게요. 슬라이드만 봐주시겠어요.',
      asp: '부교수님, 큐는 제가 정리해 두었습니다. 오전에 한번만 봐주세요.',
      prof: '교수님, 치료계획 CT는 제가 넣었습니다. 슬라이드만 봐주시면 됩니다.',
    },
    ns: {
      intern: '인턴, 양식 있으면 그걸로 올려. 내가 볼게.',
      resident: '서류는 양식 있으면 그걸로 올려 주세요. 제가 볼게요.',
      fellow: '영상 요청은 양식으로 올려 주세요. 제가 아침에 볼게요.',
      ap: '선생님, 요청은 양식으로 올려 주세요. 제가 오전에 보겠습니다.',
      asp: '부교수님, 오전에 제가 큐에 올려 두겠습니다.',
      prof: '교수님, 요청 확인했습니다. 오전에 올리겠습니다.',
    },
    em: {
      intern: '인턴, STAT은 게시판 말고 양식으로. 내가 당겨 볼게.',
      resident: 'STAT은 양식으로 올려 주세요. 제가 볼게요.',
      fellow: 'STAT 큐는 제가 볼게요. 양식만 먼저요.',
      ap: '선생님, STAT은 양식으로 주시면 제가 당기겠습니다.',
      asp: '부교수님, STAT은 제가 오전에 우선 보겠습니다.',
      prof: '교수님, STAT 확인했습니다. 오전에 올리겠습니다.',
    },
    os: {
      intern: '인턴, Knee MRI는 양식으로. 판독 전에 차트 번호 맞춰.',
      resident: 'Knee MRI는 양식으로 올려 주세요. 제가 볼게요.',
      fellow: 'Knee MRI 요청 확인했어요. 양식만 올려 주세요.',
      ap: '선생님, Knee MRI는 오전에 제가 보겠습니다.',
      asp: '부교수님, Knee MRI는 오전에 올리겠습니다.',
      prof: '교수님, Knee MRI 확인했습니다. 오전에 올리겠습니다.',
    },
    _: {
      intern: '인턴, 서류는 양식 있으면 그걸로. 내가 볼게.',
      resident: '서류는 양식 있으면 그걸로 올려 주세요. 제가 볼게요.',
      fellow: '요청은 양식으로 주세요. 오전에 제가 볼게요.',
      ap: '선생님, 양식으로 올려 주시면 제가 보겠습니다.',
      asp: '부교수님, 오전에 제가 확인하겠습니다.',
      prof: '교수님, 확인했습니다. 오전에 올리겠습니다.',
    },
  })
}

export function jeongheeReply(user: UserProfile) {
  return r(user, {
    intern: '양식으로 올리겠습니다.',
    resident: '양식으로 올렸습니다.',
    fellow: '양식 올려 두었습니다.',
    ap: '양식으로 올렸습니다. 감사합니다.',
    asp: '양식으로 올렸습니다. 오전에 부탁드립니다.',
    prof: '양식으로 올렸습니다. 오전에 보시죠.',
  })
}

/** 김지완 — 소아청소년과 */
export function jiwanLine(user: UserProfile) {
  return of(user, {
    ped: {
      intern: '인턴, 그거 왜 아직 안 했어. 보호자 오기 전에 차트 고쳐.',
      resident: '그거 왜 아직 안 했어요. 보호자 오기 전에 차트 고치세요.',
      fellow: '인계는 내가 고친 걸로. 퇴원 얘기는 말고.',
      ap: '선생님, 인계는 제가 고친 버전으로 가시죠. 퇴원 얘기는 빼요.',
      asp: '부교수님, 인계는 제가 손본 걸로 올리겠습니다.',
      prof: '교수님, 소아 쪽은 제가 보겠습니다. 결과는 오후에.',
    },
    em: {
      intern: '인턴, 애들 차트 짧게. 성인 칸에 적지 마.',
      resident: '애들 나가면 봅시다. 성인 차트는 짧게.',
      fellow: '소아 쪽은 제가 볼게요. 성인 기록만 짧게 남겨 주세요.',
      ap: '선생님, 소아 쪽은 제가 보겠습니다. 오후에 결과요.',
      asp: '부교수님, 소아 쪽은 제가 보겠습니다. 오후에 올리겠습니다.',
      prof: '교수님, 소아 쪽은 제가 보겠습니다. 결과는 오후에.',
    },
    _: {
      intern: '인턴, 소아 기록은 짧게. 보호자 오기 전에 맞춰.',
      resident: '애들 나가면 봅시다. 성인 차트는 짧게.',
      fellow: '소아 쪽은 제가 볼게요. 오후에 회신할게요.',
      ap: '선생님, 소아 쪽은 제가 보겠습니다. 오후에요.',
      asp: '부교수님, 소아 쪽은 제가 보겠습니다.',
      prof: '교수님, 소아 쪽은 제가 보겠습니다. 결과는 오후에.',
    },
  })
}

export function jiwanReply(user: UserProfile) {
  return r(user, {
    intern: '차트 고치겠습니다.',
    resident: '고친 버전으로 올리겠습니다.',
    fellow: '인계 그 버전으로 가겠습니다.',
    ap: '확인했습니다. 오후에 맞추겠습니다.',
    asp: '확인했습니다. 오후에 올리겠습니다.',
    prof: '확인했습니다. 오후에 보시죠.',
  })
}

/** 오윤경 — 정형외과 */
export function yoonLine(user: UserProfile) {
  return of(user, {
    os: {
      intern: '인턴, 일정은 임 선생한테 물어. 나는 OR.',
      resident: '일정은 임 선생한테 물어라. 나는 OR.',
      fellow: 'THA 08:40이다. 회의 끝나고.',
      ap: '선생님, THA 08:40입니다. 회의 끝나고 보시죠.',
      asp: '부교수님, 수술은 정시입니다. 일정은 레지던트에게 맡기겠습니다.',
      prof: '교수님, 수술은 정시입니다. 다른 건 제가 정리하겠습니다.',
    },
    rad: {
      intern: '인턴, Knee MRI 그거 차트 번호 맞춰 두고 와.',
      resident: 'Knee MRI 그거 내가 생각한 거하고 좀 다른데. 시간 되나?',
      fellow: 'Knee MRI, 시간 되면 한번 봅시다.',
      ap: '선생님, Knee MRI 시간 되면 한번 봅시다.',
      asp: '부교수님, Knee MRI 한번 같이 봐주시겠습니까.',
      prof: '교수님, Knee MRI 시간 되시면 한번 봐주십시오.',
    },
    an: {
      intern: '인턴, OR 03 준비만 확인해. 나는 들어간다.',
      resident: 'OR 03이다. 마취 쪽은 정시로.',
      fellow: '수술은 정시다. 마취 준비만 맞춰 주세요.',
      ap: '선생님, 수술은 정시입니다. 마취만 맞춰 주시죠.',
      asp: '부교수님, 수술은 정시입니다.',
      prof: '교수님, 수술은 정시입니다.',
    },
    _: {
      intern: '인턴, 다른 건 레지던트한테. 나는 OR.',
      resident: '수술은 정시다. 다른 건 레지던트한테.',
      fellow: '수술은 정시입니다. 일정은 짧게.',
      ap: '선생님, 수술은 정시입니다.',
      asp: '부교수님, 수술은 정시입니다.',
      prof: '교수님, 수술은 정시입니다.',
    },
  })
}

export function yoonReply(user: UserProfile) {
  return r(user, {
    intern: '임 선생님께 묻겠습니다.',
    resident: '알겠습니다. 정시로 맞추겠습니다.',
    fellow: '08:40에 맞추겠습니다.',
    ap: '확인했습니다. 정시로 가시죠.',
    asp: '확인했습니다. 정시로 가겠습니다.',
    prof: '확인했습니다. 정시로 합시다.',
  })
}

/** 김시온 — 내과 */
export function sionLine(user: UserProfile) {
  return of(user, {
    im: {
      intern: '인턴, 병상 문의는 원무 말고 나. 지금은 8W.',
      resident: '병상 문의는 원무 말고 나. 지금은 8W.',
      fellow: '8W로 열어 두었어요. 당직 교환은 게시판에.',
      ap: '선생님, 병상은 8W입니다. 당직 교환은 게시판으로요.',
      asp: '부교수님, 병상은 8W로 열어 두었습니다.',
      prof: '교수님, 병상은 8W입니다. 오전에 보고드리겠습니다.',
    },
    em: {
      intern: '인턴, 내려가. 내가 연다.',
      resident: '내려가. 내가 연다.',
      fellow: '내려와요. 병상은 내가 열게.',
      ap: '선생님, 내려오시죠. 병상은 제가 열겠습니다.',
      asp: '부교수님, 병상은 제가 열었습니다. 오시면 됩니다.',
      prof: '교수님, 병상은 제가 열었습니다.',
    },
    _: {
      intern: '인턴, 당직 교환은 게시판에 써. 여기로 말고.',
      resident: '당직 교환은 게시판에 써요. 여기로 말고.',
      fellow: '당직 교환은 게시판으로 부탁해요.',
      ap: '선생님, 당직 교환은 게시판으로 부탁드립니다.',
      asp: '부교수님, 당직은 게시판으로 정리해 주세요.',
      prof: '교수님, 당직은 게시판으로 올리겠습니다.',
    },
  })
}

export function sionReply(user: UserProfile) {
  return r(user, {
    intern: '8W로 확인하겠습니다.',
    resident: '8W로 맞추겠습니다.',
    fellow: '병상 확인했습니다.',
    ap: '확인했습니다. 8W로 가죠.',
    asp: '확인했습니다. 오전에 맞추겠습니다.',
    prof: '확인했습니다. 그렇게 합시다.',
  })
}

/** 정은성 — 병리과 */
export function eunsungLine(user: UserProfile) {
  return of(user, {
    path: {
      intern: '인턴, 말하지 말고 조직을 봐요. 초안은 오후에.',
      resident: '말하지 말고, 조직의 움직임을 봐요.',
      fellow: '초안은 오후에. frozen은 내선.',
      ap: '선생님, 초안은 오후에 올리겠습니다. frozen은 내선으로요.',
      asp: '부교수님, 초안은 오후에 올리겠습니다.',
      prof: '교수님, 초안은 오후에 올리겠습니다. frozen은 내선 3901입니다.',
    },
    ns: {
      intern: '인턴, frozen 급하면 내선 3901. 초안은 건드리지 마.',
      resident: 'preliminary는 10시 이후. 급하면 내선 3901.',
      fellow: 'prelim은 10시 이후예요. 급하면 내선요.',
      ap: '선생님, prelim은 10시 이후입니다. 급하시면 내선 3901.',
      asp: '부교수님, prelim은 10시 이후 올리겠습니다.',
      prof: '교수님, prelim은 10시 이후 올리겠습니다.',
    },
    _: {
      intern: '인턴, 급하면 내선 3901. 초안은 오후에.',
      resident: 'preliminary는 10시 이후. 급하면 내선 3901.',
      fellow: 'prelim은 10시 이후입니다. 급하면 내선요.',
      ap: '선생님, 급하시면 내선 3901입니다.',
      asp: '부교수님, 오후에 초안 올리겠습니다.',
      prof: '교수님, 오후에 초안 올리겠습니다.',
    },
  })
}

export function eunsungReply(user: UserProfile) {
  return r(user, {
    intern: '내선으로 확인하겠습니다.',
    resident: '10시 이후로 기다리겠습니다.',
    fellow: '오후에 초안 보겠습니다.',
    ap: '확인했습니다. 오후에 보시죠.',
    asp: '확인했습니다. 오후에 부탁드립니다.',
    prof: '확인했습니다. 오후에 합시다.',
  })
}

/** 이채형 — 의공학 / 마취 겸임 */
export function chaeLine(user: UserProfile) {
  return of(user, {
    an: {
      intern: '인턴, prototype은 IRB 번호 그대로. 만지려면 기록 남겨.',
      resident: 'prototype은 IRB 번호 그대로. 만지려면 기록 남기세요.',
      fellow: '장비는 IRB 번호 그대로요. 기록만 남겨 주세요.',
      ap: '선생님, 장비는 IRB 번호 그대로입니다. 기록만 남겨 주시죠.',
      asp: '부교수님, IRB 번호는 그대로 두었습니다.',
      prof: '교수님, IRB 번호는 그대로입니다. 오후에 설명드리겠습니다.',
    },
    os: {
      intern: '인턴, OR 장비는 매뉴얼보다 내가 하는 게 빨라. 오후에 와.',
      resident: '장비 설명은 오후에. 매뉴얼보다 제가 하는 게 빨라요.',
      fellow: 'OR 장비는 오후에 제가 설명할게요.',
      ap: '선생님, 장비는 오후에 제가 설명드리겠습니다.',
      asp: '부교수님, 장비는 오후에 설명드리겠습니다.',
      prof: '교수님, 장비는 오후에 설명드리겠습니다.',
    },
    _: {
      intern: '인턴, 만지려면 기록 남겨. 오후에 내가 볼게.',
      resident: '장비 설명은 오후에. 매뉴얼보다 제가 하는 게 빨라요.',
      fellow: '오후에 제가 설명할게요. 기록만 남겨 주세요.',
      ap: '선생님, 오후에 설명드리겠습니다.',
      asp: '부교수님, 오후에 설명드리겠습니다.',
      prof: '교수님, 오후에 설명드리겠습니다.',
    },
  })
}

export function chaeReply(user: UserProfile) {
  return r(user, {
    intern: '기록 남기겠습니다.',
    resident: 'IRB 번호 그대로 두겠습니다.',
    fellow: '오후에 설명 듣겠습니다.',
    ap: '확인했습니다. 오후에 보시죠.',
    asp: '확인했습니다. 오후에 부탁드립니다.',
    prof: '확인했습니다. 오후에 합시다.',
  })
}
