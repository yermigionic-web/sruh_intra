export type Gender = 'F' | 'M'

export type RankId =
  | 'intern'
  | 'r1'
  | 'r2'
  | 'r3'
  | 'r4'
  | 'f1'
  | 'f2'
  | 'ap'
  | 'asp'
  | 'prof'

export type RankBand = 'intern' | 'resident' | 'fellow' | 'faculty'

export type Priority = 'STAT' | 'URGENT' | 'ROUTINE'

export type EventKind =
  | 'er_surge'
  | 'consult'
  | 'pager'
  | 'imaging'
  | 'or'
  | 'code'
  | 'handoff'
  | 'lost_found'
  | 'bed'
  | 'conference'
  | 'meeting'
  | 'approval'
  | 'chart'
  | 'break'
  | 'cafeteria'
  | 'notice'
  | 'archive'
  | 'admin'

export interface Department {
  id: string
  name: string
  short: string
  selectable: boolean
  group: 'clinical' | 'support' | 'admin'
}

export interface Rank {
  id: RankId
  label: string
  short: string
  level: number
  band: RankBand
}

export interface Staff {
  id: string
  name: string
  gender: Gender
  age?: number
  departmentId: string
  adjunctDepartmentId?: string
  rankId: RankId
  specialty?: string
  almaMater?: string
  extension?: string
  employeeNo: string
  isMain: boolean
  photo?: string
  origin?: string
  status?: string
  bio?: string
}

export interface LedgerEvent {
  id: string
  at: string
  location?: string
  departmentIds: string[]
  staffIds: string[]
  kind: EventKind
  priority?: Priority
  visibility: 'all' | 'dept' | 'staff'
  surfaces: string[]
  title: string
  summary?: string
  payload?: Record<string, string | number | boolean | undefined>
}

export interface UserProfile {
  name: string
  gender: 'F'
  departmentId: string
  rankId: RankId
  registeredAt: string
  sessionDay: string
  readMessages: string[]
  readPagers: string[]
  viewedRecords: string[]
  archiveUnlocked: boolean
  archiveHint: boolean
  favoriteStaffIds: string[]
}

export interface PagerMessage {
  at: string
  staffId: string
  text: string
}

export interface PagerThread {
  id: string
  at: string
  fromStaffId: string
  fromDeptId: string
  toStaffId: string
  toDeptId: string
  priority: Priority
  subject: string
  eventId?: string
  sent: string
  delivered?: string
  read?: string
  ack?: string
  messages: PagerMessage[]
  personalized?: boolean
}

export interface ChatMessage {
  id: string
  at: string
  fromStaffId: string
  text: string
}

export interface ChatThread {
  id: string
  staffId: string
  lastSeen?: string
  messages: ChatMessage[]
  personalized?: boolean
}

export interface BoardPost {
  id: string
  at: string
  board: 'notice' | 'staff' | 'lost'
  category: string
  title: string
  authorId?: string
  authorLabel?: string
  body: string
  comments: BoardComment[]
}

export interface BoardComment {
  id: string
  at: string
  authorId?: string
  authorLabel?: string
  text: string
}

export interface DutySlot {
  departmentId: string
  shift: 'DAY' | 'NIGHT'
  staffId?: string
  placeholder?: 'user'
  note?: string
}

export interface SurgeryCase {
  id: string
  or: string
  departmentId: string
  procedure: string
  surgeonId: string
  status: '예정' | '준비' | '진행 중' | 'Emergency' | '종료'
  start?: string
  end?: string
  eventId?: string
}

export interface ImagingStudy {
  id: string
  at: string
  modality: 'CT' | 'MRI' | 'XR' | 'US' | 'CTA' | 'Angio'
  exam: string
  fromDeptId: string
  priority: Priority
  status: 'Waiting' | 'Scanning' | 'Reading' | 'Assigned' | 'Prelim' | 'Final'
  assignedId?: string
  eventId?: string
}

export interface HandoffNote {
  id: string
  at: string
  ward: string
  room: string
  authorId: string
  departmentId: string
  body: string
  modifiedAt?: string
  modifiedBy?: string
}

export interface ConsultItem {
  id: string
  at: string
  fromDeptId: string
  toDeptId: string
  fromStaffId: string
  toStaffId?: string
  subject: string
  status: '미확인' | '확인' | '진행' | '종료'
  priority: Priority
  eventId?: string
}

export interface ConferenceItem {
  id: string
  at: string
  end?: string
  place: string
  title: string
  speakers: string[]
  note?: string
  eventId?: string
}

export interface AcademicRecord {
  staffId: string
  date: string
  title: string
  venue?: string
  role: string
}

export interface ProfilePost {
  id: string
  staffId: string
  at: string
  image?: string
  imageLabel?: string
  alt?: string
  caption: string
  comments: BoardComment[]
}

export interface ScheduleItem {
  id: string
  staffId: string
  at: string
  end?: string
  title: string
  place?: string
  status?: string
  note?: string
}

export interface ApprovalItem {
  id: string
  at: string
  title: string
  requesterId: string
  status: '대기' | '반려' | '재신청' | '승인'
  note?: string
}

export interface CafeteriaMenu {
  meal: '조식' | '중식' | '석식'
  items: string[]
  note?: string
}

export interface ArchiveRecord {
  id: string
  at: string
  kind: string
  title: string
  body: string
  staffIds: string[]
}
