import { useState } from 'react'
import { BOARD_POSTS } from '@/data/board'
import { hm, isPast } from '@/lib/time'
import { useApp } from '@/context'
import { Screen, Group, Row } from '@/components/ui'
import { Segmented } from '@/components/Segmented'
import { staffById } from '@/data/staff'
import type { BoardPost } from '@/types'

function stamp(at: string) {
  return at.includes('T') ? at.slice(5, 16).replace('T', ' ') : hm(at)
}

export function BoardPage() {
  return <BoardList title="직원게시판" board="staff" segmented />
}

export function NoticesPage() {
  return <BoardList title="공지사항" board="notice" />
}

export function LostPage() {
  return <BoardList title="분실물" board="lost" />
}

function BoardList({
  title,
  board,
  segmented,
}: {
  title: string
  board: BoardPost['board']
  segmented?: boolean
}) {
  const { view, openPost } = useApp()
  const [tab, setTab] = useState<'all' | 'notice' | 'duty' | 'talk'>('all')
  const posts = BOARD_POSTS.filter((p) => p.board === board && isPast(p.at))
  const filtered = !segmented
    ? posts
    : posts.filter((p) => {
        if (tab === 'all') return true
        if (tab === 'notice') return ['행정', '학술', '시설', '업무'].includes(p.category)
        if (tab === 'duty') return p.category === '당직 교환'
        return ['회식', '중고', '직원식당', '세미나'].includes(p.category)
      })

  return (
    <Screen title={title} back="/more">
      {segmented ? (
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { id: 'all', label: '전체' },
            { id: 'notice', label: '공지' },
            { id: 'duty', label: '당직교환' },
            { id: 'talk', label: '잡담' },
          ]}
        />
      ) : null}
      <Group>
        {filtered.length === 0 ? (
          <div className="row static">
            <div className="row-text">
              <div className="row-meta">게시물이 없습니다.</div>
            </div>
          </div>
        ) : (
          filtered.map((p) => (
            <Row
              key={p.id}
              title={p.title}
              meta={`${p.category} · ${p.authorId ? staffById(p.authorId)?.name ?? '' : p.authorLabel}`}
              detail={stamp(p.at)}
              onClick={() => {
                view(`post:${p.id}`)
                openPost(p.id)
              }}
            />
          ))
        )}
      </Group>
    </Screen>
  )
}
