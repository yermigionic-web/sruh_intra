import type { CafeteriaMenu } from '@/types'

export const CAFETERIA: CafeteriaMenu[] = [
  {
    meal: '조식',
    items: ['황태국', '계란말이', '김', '잡곡밥', '깍두기'],
    note: '06:00–09:00 · 본관 B1',
  },
  {
    meal: '중식',
    items: ['제육볶음', '미역국', '시금치나물', '잡곡밥', '포기김치'],
    note: '11:30–13:30 · 제육 조기소진 시 생선까스',
  },
  {
    meal: '석식',
    items: ['순두부찌개', '고등어구이', '콩나물무침', '잡곡밥', '열무김치'],
    note: '17:30–19:30',
  },
]

export const CAFE_RECEIPTS = [
  {
    at: '07:26:00',
    place: '본관 1F 카페',
    lines: ['아메리카노 2', '카페라떼 1', '홍차 1'],
    payerId: 'kim-sion',
    amount: 18600,
  },
]
