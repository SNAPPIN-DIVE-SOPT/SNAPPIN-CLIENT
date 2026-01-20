const PRODUCT_DETAIL_MOCK = {
  "id": 201,
  "images": [
    "https://picsum.photos/576/576?random=1",
    "https://picsum.photos/576/576?random=2",
    "https://picsum.photos/576/576?random=3",
    "https://picsum.photos/576/576?random=4",
    "https://picsum.photos/576/576?random=5",
  ],
  "title": "상품명",
  "isLiked": true,
  "averageRate": 4.7,
  "reviewCount": 10,
  "price": 80000,
  "photographerInfo": {
    "id": 1,
		"name": "나작가",
    "bio": "내일의 나를 기록합니다",
    "specialties": [
      "졸업스냅",
      "웨딩스냅"
    ],
    "locations": [
      "서울",
      "경기"
    ]
  },
  "productInfo": {
    "snapCategory": "졸업스냅",
    "regions": ["서울", "경기"],
    "moods": ["차분한", "미니멀", "투명한"],
    "maxPeople": "4",
    "photographerCount": "1",
    "durationTime": "2",
    "provideRaw": "전달 불가",
    "provideOriginalJpg": "전달 가능(유료)",
    "originalJpgCount": "원본 전체",
    "originalDeliveryTime": "원본 제공 시점",
    "provideVideo": "전달 가능(유료)",
    "freeRevisionCount": "2회",
    "finalCutCount": "8장 (이후 유료)",
    "finalDeliveryTime": "2주",
    "description": "상품 소개",
    "processDescription": "촬영 진행 순서",
    "equipment": "사용 장비",
    "caution": "기타 주의 사항"
  }
}

export default PRODUCT_DETAIL_MOCK;