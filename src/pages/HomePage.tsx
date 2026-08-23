import { CONFERENCES } from '@/data/academic'
import { CONSULTS } from '@/data/consults'
import { deptName } from '@/data/departments'
import { rankShort } from '@/lib/hierarchy'
import { dashboardDutyLabel, todoItems } from '@/lib/personalize'
import { unreadInboxCount, unreadMessageCount, unreadPagerCount, allThreads } from '@/lib/inbox'
import { CANONICAL_NOW, hm, isPast, weekdayKo } from '@/lib/time'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'
import { staffById } from '@/data/staff'

export function HomePage() {
  const { profile } = useApp()
  if (!profile) return null
  const todos = todoItems(profile)
  const unread = unreadInboxCount(profile)
  const unreadMsg = unreadMessageCount(profile)
  const unreadPg = unreadPagerCount(profile)
  const codeLive = isPast('06:37:00') && !isPast('06:46:00')
  const urgent = CONSULTS.filter((c) => c.status === '미확인' || (c.priority !== 'ROUTINE' && c.status === '진행'))
  const threads = allThreads(profile)
  const lastNames = threads
    .slice(0, 3)
    .map((t) => staffById(t.staffId)?.name)
    .filter(Boolean)
  const nextTodo = todos.find((t) => t.due >= hm(CANONICAL_NOW)) ?? todos[0]
  const d = new Date(CANONICAL_NOW)

  const timeline = [
    { at: '07:30', title: '인계 · 오전 정리', meta: todos[1]?.label ?? '병동' },
    { at: '08:05', title: '교수진 오전 회의', meta: '본관 3F A' },
    { at: '09:00', title: CONFERENCES[1].title, meta: CONFERENCES[1].place },
    { at: '13:44', title: CONFERENCES[2].title, meta: CONFERENCES[2].place },
    { at: '18:00', title: 'Night Duty', meta: dashboardDutyLabel(profile) },
  ]

  return (
    <Screen title="Home" large>
      <p className="hello">안녕하세요, {profile.name} 선생님</p>
      <p className="hello-meta">
        {deptName(profile.departmentId)} · {rankShort(profile.rankId)}
      </p>
      <p className="hello-time">
        {d.getMonth() + 1}월 {d.getDate()}일 {weekdayKo(CANONICAL_NOW)} · {hm(CANONICAL_NOW)}
      </p>

      <Group header="지금 확인하세요">
        {codeLive ? (
          <Row
            title={
              <span className="prio">
                <i className="pill red" />
                Code Blue
              </span>
            }
            meta="ER B1 Resuscitation Bay · 06:37–"
            to="/more/consult"
          />
        ) : null}
        {urgent[0] ? (
          <Row
            title={
              <span className="prio">
                <i className="pill orange" />
                Urgent Consult
              </span>
            }
            meta={`${urgent[0].subject} · ${urgent[0].status}`}
            to="/more/consult"
          />
        ) : null}
        {unreadMsg > 0 ? (
          <Row
            title={
              <span className="prio">
                <i className="pill blue" />
                메시지 {unreadMsg}개
              </span>
            }
            meta={lastNames.length ? `${lastNames[0]} 외` : '미확인'}
            to="/messages"
          />
        ) : null}
        {unreadPg > 0 ? (
          <Row
            title={
              <span className="prio">
                <i className="pill orange" />
                미확인 호출 {unreadPg}
              </span>
            }
            meta="Pager"
            to="/messages?tab=pager"
          />
        ) : null}
      </Group>

      <div className="metrics">
        <div className="metric">
          <div className="k">당직</div>
          <div className="v" style={{ fontSize: 18, marginTop: 8 }}>
            {dashboardDutyLabel(profile)}
          </div>
        </div>
        <div className="metric">
          <div className="k">미확인 호출</div>
          <div className="v">{unreadPg}</div>
        </div>
        <div className="metric">
          <div className="k">남은 업무</div>
          <div className="v">{todos.length}</div>
        </div>
        <div className="metric">
          <div className="k">다음 일정</div>
          <div className="v" style={{ fontSize: 18, marginTop: 8 }}>
            {nextTodo ? `${nextTodo.due} ${nextTodo.label}` : '—'}
          </div>
        </div>
      </div>

      <Group header="Today">
        <div className="timeline">
          {timeline.map((x) => (
            <div className="tl" key={x.at}>
              <div className="t">{x.at}</div>
              <div>
                <div className="ttl">{x.title}</div>
                <div className="m">{x.meta}</div>
              </div>
            </div>
          ))}
        </div>
        <Row title="전체 일정" to="/schedule" />
      </Group>

      <Group header="할 일">
        {todos.map((t) => (
          <div className="row static" key={t.label}>
            <div className="row-detail">{t.due}</div>
            <div className="row-text">
              <div className="row-title">{t.label}</div>
            </div>
          </div>
        ))}
      </Group>

      <p className="faint" style={{ fontSize: 13 }}>
        알림 {unread}건
      </p>
    </Screen>
  )
}
