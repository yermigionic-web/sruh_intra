import { BOARD_POSTS } from '@/data/board'
import { PROFILE_POSTS } from '@/data/profiles'
import { hm } from '@/lib/time'
import { useApp } from '@/context'
import { StaffName } from '@/components/StaffName'

function stamp(at: string) {
  return at.includes('T') ? at.replace('T', ' ').slice(0, 16) : hm(at)
}

export function PostSheet() {
  const { sheet, closeSheet } = useApp()
  if (sheet?.kind !== 'post') return null
  const profilePost = PROFILE_POSTS.find((p) => p.id === sheet.id)
  const boardPost = BOARD_POSTS.find((p) => p.id === sheet.id)
  if (!profilePost && !boardPost) return null
  return (
    <div className="sheet-bg" onClick={closeSheet}>
      <aside className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nav-stack">
          <div className="nav-stack-row">
            <button className="nav-back" onClick={closeSheet}>
              닫기
            </button>
            <h1 className="nav-title">{boardPost ? boardPost.category : '게시물'}</h1>
            <span />
          </div>
        </div>
        <div className="screen-body">
          {profilePost ? (
            <>
              <img
                className="post-hero"
                src={`/posts/${profilePost.id}.png`}
                alt={profilePost.alt ?? profilePost.caption ?? ''}
              />
              <p className="faint">{stamp(profilePost.at)}</p>
              <p>{profilePost.caption || <span className="faint">캡션 없음</span>}</p>
              {profilePost.comments.map((c) => (
                <div className="row static" key={c.id}>
                  <div className="row-text">
                    <div className="row-title">{c.authorId ? <StaffName id={c.authorId} /> : c.authorLabel}</div>
                    <div className="row-meta wrap">{c.text}</div>
                  </div>
                </div>
              ))}
              <p className="faint" style={{ fontSize: 12 }}>
                파일 {profilePost.imageLabel}
                {profilePost.alt ? ` · alt ${profilePost.alt}` : ''}
              </p>
            </>
          ) : boardPost ? (
            <>
              <h2 className="sheet-h">{boardPost.title}</h2>
              <p className="faint">
                {stamp(boardPost.at)} · {boardPost.authorId ? <StaffName id={boardPost.authorId} /> : boardPost.authorLabel}
              </p>
              <pre className="record">{boardPost.body}</pre>
              {boardPost.comments.length ? (
                <div className="group" style={{ marginTop: 16 }}>
                  <div className="group-h">댓글</div>
                  <div className="group-body">
                    {boardPost.comments.map((c) => (
                      <div className="row static" key={c.id}>
                        <div className="row-text">
                          <div className="row-title">{c.authorId ? <StaffName id={c.authorId} /> : c.authorLabel}</div>
                          <div className="row-meta wrap">{c.text}</div>
                        </div>
                        <div className="row-detail">{stamp(c.at)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="faint">댓글 없음</p>
              )}
            </>
          ) : null}
        </div>
      </aside>
    </div>
  )
}
