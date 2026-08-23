import { CAFETERIA } from '@/data/cafeteria'
import { Screen, Group } from '@/components/ui'

export function CafeteriaPage() {
  return (
    <Screen title="식당" back="/more">
      <p className="faint" style={{ marginTop: 0 }}>
        본관 B1 · 11/14
      </p>
      {CAFETERIA.map((m) => (
        <Group key={m.meal} header={`${m.meal} · ${m.note}`}>
          {m.items.map((i) => (
            <div className="row static" key={i}>
              <div className="row-text">
                <div className="row-title">{i}</div>
              </div>
            </div>
          ))}
        </Group>
      ))}
      <p className="faint">금요일 제육 조기소진 반복. 대체 메뉴는 영양팀 공지.</p>
    </Screen>
  )
}
