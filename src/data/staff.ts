import { asset } from '@/lib/asset'
import type { RankId, Staff } from '@/types'

function st(
  id: string,
  name: string,
  gender: 'F' | 'M',
  age: number,
  departmentId: string,
  rankId: RankId,
  extra: Partial<Staff> = {},
): Staff {
  return {
    id,
    name,
    gender,
    age,
    departmentId,
    rankId,
    employeeNo: extra.employeeNo ?? `20${String(2010 + (60 - (age || 30))).slice(-2)}-${id.slice(0, 4).toUpperCase()}`,
    isMain: extra.isMain ?? false,
    ...extra,
    photo: extra.photo ? asset(extra.photo) : extra.photo,
  }
}

export const STAFF: Staff[] = [
  st('kim-jiwan', '김지완', 'F', 37, 'ped', 'asp', {
    isMain: true,
    specialty: '소아감염·중증소아',
    almaMater: '서록대학교 의과대학',
    extension: '6241',
    employeeNo: '2014-PED-082',
    origin: '대전',
    photo: '/profiles/kim-jiwan.png',
    status: '7W 인계',
    bio: 'Pediatrics. Night coverage preferred via pager.',
  }),
  st('yoo-jeonghee', '유정희', 'F', 31, 'rad', 'f2', {
    isMain: true,
    specialty: '영상의학·일정 조율',
    almaMater: '서록대학교 생명융합공학과',
    extension: '4480',
    employeeNo: '2023-RAD-017',
    origin: '서울',
    photo: '/profiles/yoo-jeonghee.png',
    status: '판독실',
    bio: '영상의학과. 일정/서류 요청은 메신저보다 게시판 양식을 이용해 주세요.',
  }),
  st('oh-yoonkyung', '오윤경', 'F', 39, 'os', 'prof', {
    isMain: true,
    specialty: '고관절·인공관절',
    almaMater: 'Johns Hopkins University School of Medicine',
    extension: '7102',
    employeeNo: '2012-OS-003',
    origin: '부산',
    photo: '/profiles/oh-yoonkyung.png',
    status: 'OR 03',
    bio: 'Orthopaedic surgery. 일정 문의는 임도윤 R3.',
  }),
  st('kang-bin', '강빈', 'F', 28, 'em', 'r2', {
    isMain: true,
    specialty: '응급의학',
    almaMater: '서울대학교 의과대학',
    extension: '9112',
    employeeNo: '2024-EM-029',
    origin: '광주',
    photo: '/profiles/kang-bin.png',
    status: 'ER',
    bio: 'Emergency medicine. STAT only.',
  }),
  st('kim-sion', '김시온', 'F', 28, 'im', 'r3', {
    isMain: true,
    specialty: '일반내과·입원전담',
    almaMater: '서록대학교 의학부 의학공학과',
    extension: '5328',
    employeeNo: '2023-IM-044',
    origin: '인천',
    photo: '/profiles/kim-sion.png',
    status: '9W',
    bio: 'Internal medicine. 당직 교환은 48시간 전.',
  }),
  st('park-harim', '박하림', 'F', 34, 'ns', 'ap', {
    isMain: true,
    specialty: '뇌혈관·중증 두부외상',
    almaMater: 'Johns Hopkins University School of Medicine',
    extension: '7314',
    employeeNo: '2018-NS-011',
    origin: 'Chicago',
    photo: '/profiles/park-harim.png',
    status: 'OR',
    bio: 'Neurosurgery. Please page for urgent consults.',
  }),
  st('jeong-eunsung', '정은성', 'F', 41, 'path', 'prof', {
    isMain: true,
    specialty: '외과병리·신경병리',
    almaMater: '서울대학교 의예과',
    extension: '3901',
    employeeNo: '2009-PATH-002',
    origin: '대전',
    photo: '/profiles/jeong-eunsung.png',
    status: '판독실',
    bio: 'Pathology. Frozen 요청은 내선 우선.',
  }),
  st('lee-chaehyung', '이채형', 'F', 34, 'bme', 'ap', {
    isMain: true,
    adjunctDepartmentId: 'an',
    specialty: '의공학·마취통증의학 겸임',
    almaMater: 'Harvard University, Chemical Engineering',
    extension: '8804',
    employeeNo: '2019-BME-006',
    origin: '부산',
    photo: '/profiles/lee-chaehyung.png',
    status: 'BME Lab',
    bio: 'Biomedical engineering / Anesthesiology (adjunct). Device trials via IRB only.',
  }),

  st('han-seungwoo', '한승우', 'M', 56, 'ent', 'prof', { specialty: '비과', almaMater: '연세대학교 의과대학', extension: '2501', employeeNo: '1999-ENT-001' }),
  st('moon-jiyoung', '문지영', 'F', 48, 'ent', 'asp', { specialty: '이과', almaMater: '서울대학교 의과대학', extension: '2504', employeeNo: '2006-ENT-008' }),
  st('bae-hyunsoo', '배현수', 'M', 41, 'ent', 'ap', { specialty: '두경부외과', almaMater: '고려대학교 의과대학', extension: '2511', employeeNo: '2015-ENT-014' }),
  st('shin-yerin', '신예린', 'F', 34, 'ent', 'f2', { specialty: '음성·후두질환', almaMater: '한양대학교 의과대학', extension: '2520', employeeNo: '2024-ENT-022' }),
  st('kwak-dohyun', '곽도현', 'M', 29, 'ent', 'r3', { specialty: '이비인후과', almaMater: '부산대학교 의과대학', extension: '2528', employeeNo: '2023-ENT-031' }),

  st('yoon-taekyung', '윤태경', 'M', 55, 'im', 'prof', { specialty: '순환기내과', almaMater: '서울대학교 의과대학', extension: '5131', employeeNo: '2001-IM-004' }),
  st('lim-sua', '임수아', 'F', 47, 'im', 'asp', { specialty: '소화기내과', almaMater: '가톨릭대학교 의과대학', extension: '5144', employeeNo: '2008-IM-019' }),
  st('ryu-hangyeol', '류한결', 'M', 42, 'im', 'ap', { specialty: '호흡기내과', almaMater: '성균관대학교 의과대학', extension: '5152', employeeNo: '2016-IM-027' }),
  st('jin-seoyoung', '진서영', 'F', 35, 'im', 'f2', { specialty: '내분비내과', almaMater: '경희대학교 의과대학', extension: '5160', employeeNo: '2024-IM-038' }),

  st('kang-daewon', '강대원', 'M', 57, 'ns', 'prof', { specialty: '뇌혈관외과', almaMater: '서울대학교 의과대학', extension: '7301', employeeNo: '1998-NS-001' }),
  st('hwang-jisoo', '황지수', 'F', 49, 'ns', 'asp', { specialty: '척추신경외과', almaMater: '연세대학교 의과대학', extension: '7308', employeeNo: '2007-NS-009' }),
  st('nam-kihoon', '남기훈', 'M', 35, 'ns', 'f1', { specialty: '뇌종양', almaMater: '울산대학교 의과대학', extension: '7322', employeeNo: '2025-NS-018' }),
  st('cho-yuna', '조유나', 'F', 30, 'ns', 'r4', { specialty: '신경외과', almaMater: '전남대학교 의과대학', extension: '7330', employeeNo: '2022-NS-024' }),

  st('seo-jeongho', '서정호', 'M', 50, 'os', 'asp', { specialty: '슬관절', almaMater: '고려대학교 의과대학', extension: '7110', employeeNo: '2005-OS-007' }),
  st('han-jimin', '한지민', 'F', 43, 'os', 'ap', { specialty: '수부', almaMater: '중앙대학교 의과대학', extension: '7118', employeeNo: '2014-OS-015' }),
  st('baek-seunghyun', '백승현', 'M', 34, 'os', 'f1', { specialty: '스포츠의학', almaMater: '인하대학교 의과대학', extension: '7126', employeeNo: '2025-OS-021' }),
  st('lim-doyoon', '임도윤', 'F', 29, 'os', 'r3', { specialty: '정형외과', almaMater: '충남대학교 의과대학', extension: '7134', employeeNo: '2023-OS-033' }),

  st('cha-minkyung', '차민경', 'F', 47, 'path', 'asp', { specialty: '외과병리', almaMater: '서울대학교 의과대학', extension: '3910', employeeNo: '2008-PATH-006' }),
  st('kwon-narae', '권나래', 'F', 41, 'path', 'ap', { specialty: '세포병리', almaMater: '한양대학교 의과대학', extension: '3918', employeeNo: '2015-PATH-012' }),
  st('song-jaewoo', '송재우', 'M', 33, 'path', 'f1', { specialty: '분자병리', almaMater: '경북대학교 의과대학', extension: '3924', employeeNo: '2025-PATH-019' }),
  st('yang-sebin', '양세빈', 'F', 29, 'path', 'r3', { specialty: '병리과', almaMater: '영남대학교 의과대학', extension: '3930', employeeNo: '2023-PATH-027' }),

  st('noh-hyunseok', '노현석', 'M', 54, 'an', 'prof', { specialty: '심장마취', almaMater: '서울대학교 의과대학', extension: '6401', employeeNo: '2002-AN-002' }),
  st('pyo-jiwon', '표지원', 'F', 46, 'an', 'asp', { specialty: '통증의학', almaMater: '가톨릭대학교 의과대학', extension: '6412', employeeNo: '2009-AN-011' }),
  st('koo-hayoung', '구하영', 'F', 33, 'an', 'f1', { specialty: '부위마취', almaMater: '아주대학교 의과대학', extension: '6420', employeeNo: '2025-AN-020' }),
  st('ma-junho', '마준호', 'M', 28, 'an', 'r2', { specialty: '마취통증의학과', almaMater: '조선대학교 의과대학', extension: '6428', employeeNo: '2024-AN-029' }),

  st('cheon-woosung', '천우성', 'M', 53, 'em', 'prof', { specialty: '중증외상', almaMater: '연세대학교 의과대학', extension: '9101', employeeNo: '2003-EM-001' }),
  st('do-kyunga', '도경아', 'F', 46, 'em', 'asp', { specialty: '심폐소생·중독', almaMater: '서울대학교 의과대학', extension: '9108', employeeNo: '2009-EM-007' }),
  st('bong-junyoung', '봉준영', 'M', 40, 'em', 'ap', { specialty: '응급중환자', almaMater: '한림대학교 의과대학', extension: '9116', employeeNo: '2016-EM-015' }),
  st('ha-seojin', '하서진', 'F', 34, 'em', 'f2', { specialty: '응급초음파', almaMater: '가천대학교 의과대학', extension: '9124', employeeNo: '2024-EM-021' }),

  st('byun-juhwan', '변주환', 'M', 54, 'ped', 'prof', { specialty: '소아심장', almaMater: '서울대학교 의과대학', extension: '6201', employeeNo: '2001-PED-002' }),
  st('seol-gaeun', '설가은', 'F', 41, 'ped', 'ap', { specialty: '소아내분비', almaMater: '고려대학교 의과대학', extension: '6218', employeeNo: '2015-PED-016' }),
  st('chu-minjae', '추민재', 'M', 34, 'ped', 'f1', { specialty: '신생아', almaMater: '한양대학교 의과대학', extension: '6226', employeeNo: '2025-PED-023' }),
  st('bang-yewon', '방예원', 'F', 29, 'ped', 'r3', { specialty: '소아청소년과', almaMater: '부산대학교 의과대학', extension: '6234', employeeNo: '2023-PED-030' }),

  st('jin-hyunju', '진현주', 'F', 55, 'obgyn', 'prof', { specialty: '부인종양', almaMater: '서울대학교 의과대학', extension: '2701', employeeNo: '2000-OB-001' }),
  st('woo-sungmin', '우성민', 'M', 48, 'obgyn', 'asp', { specialty: '모체태아의학', almaMater: '연세대학교 의과대학', extension: '2708', employeeNo: '2007-OB-009' }),
  st('sagong-bin', '사공빈', 'F', 42, 'obgyn', 'ap', { specialty: '생식내분비·난임', almaMater: '고려대학교 의과대학', extension: '2716', employeeNo: '2016-OB-017' }),
  st('yeom-jiho', '염지호', 'M', 34, 'obgyn', 'f1', { specialty: '부인종양', almaMater: '이화여자대학교 의과대학', extension: '2724', employeeNo: '2025-OB-024' }),
  st('pyo-nayoon', '표나윤', 'F', 29, 'obgyn', 'r3', { specialty: '산부인과', almaMater: '경상국립대학교 의과대학', extension: '2732', employeeNo: '2023-OB-032' }),

  st('seon-woojin', '선우진', 'M', 55, 'rad', 'prof', { specialty: '신경영상', almaMater: '서울대학교 의과대학', extension: '4401', employeeNo: '2000-RAD-001' }),
  st('myung-seoyoon', '명서윤', 'F', 48, 'rad', 'asp', { specialty: '유방·복부영상', almaMater: '연세대학교 의과대학', extension: '4408', employeeNo: '2007-RAD-006' }),
  st('tak-hyunwoo', '탁현우', 'M', 42, 'rad', 'ap', { specialty: '중재·정위', almaMater: '성균관대학교 의과대학', extension: '4416', employeeNo: '2016-RAD-013' }),
  st('wi-soram', '위소람', 'F', 29, 'rad', 'r3', { specialty: '영상의학과', almaMater: '전북대학교 의과대학', extension: '4424', employeeNo: '2023-RAD-025' }),
]

export const STAFF_BY_ID = Object.fromEntries(STAFF.map((s) => [s.id, s])) as Record<string, Staff>

export function staffById(id: string) {
  return STAFF_BY_ID[id]
}

export function mainStaff() {
  return STAFF.filter((s) => s.isMain)
}

export function staffInDept(departmentId: string) {
  return STAFF.filter(
    (s) => s.departmentId === departmentId || s.adjunctDepartmentId === departmentId,
  )
}

export function displayTitle(s?: Staff) {
  if (!s) return ''
  const rank = s.rankId
  const map: Record<string, string> = {
    intern: '인턴',
    r1: 'R1',
    r2: 'R2',
    r3: 'R3',
    r4: 'R4',
    f1: 'F1',
    f2: 'F2',
    ap: '조교수',
    asp: '부교수',
    prof: '정교수',
  }
  return map[rank] ?? rank
}
