import { HOSPITAL_NAME } from '@/brand'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'

export function MorePage() {
  const { profile } = useApp()
  if (!profile) return null
  return (
    <Screen title="More" large>
      <Group header="진료">
        <Row title="수술실 현황" to="/more/or" />
        <Row title="병동 현황" to="/more/ward" />
        <Row title="응급협진" to="/more/consult" />
        <Row title="인계" to="/more/handoff" />
        <Row title="영상검사" to="/more/imaging" />
      </Group>
      <Group header="원내">
        <Row title="직원게시판" to="/more/board" />
        <Row title="공지사항" to="/more/notices" />
        <Row title="분실물센터" to="/more/lost" />
        <Row title="식당" to="/more/cafeteria" />
      </Group>
      <Group header="학술 · 행정">
        <Row title="학회 / 세미나" to="/more/academic" />
        <Row title="연구" to="/more/research" />
        <Row title="논문실적" to="/more/papers" />
        <Row title="전자결재" to="/more/approvals" />
        <Row title="회의실" to="/more/rooms" />
      </Group>
      <Group header="나">
        <Row title="최근 열람" to="/more/recent" />
        <Row title="직원 프로필 설정" to="/more/settings" />
      </Group>
      <Group header="Archive">
        {profile.archiveUnlocked ? (
          <Row title="Archive" meta="2025.03–" to="/more/archive" />
        ) : profile.archiveHint ? (
          <Row title="ARCHIVED DATA AVAILABLE" meta="2025.03–" to="/more/archive" />
        ) : (
          <Row title="잠김" meta="기록을 더 열람하면 표시됩니다" />
        )}
      </Group>
      <p className="faint" style={{ fontSize: 12, padding: '0 4px' }}>
        {HOSPITAL_NAME}
      </p>
    </Screen>
  )
}
