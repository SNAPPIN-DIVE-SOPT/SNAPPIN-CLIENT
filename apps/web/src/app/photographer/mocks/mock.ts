export const PHOTOGRAPHER_MOCK = {
    "success": true,
    "status": 200,
    "message": "성공적으로 작가 프로필을 조회했습니다.",
    "code": "PHOTOGRAPHER_200_001",
    "data": {
        "id": 1,
        "name": "스윙스냅",
        "bio": "일상의 아름다움을 포착합니다",
        "specialties": [
            "졸업스냅",
            "연주스냅"
        ],
        "locations": [
            "서울"
        ],
        "profileImageUrl": "https://picsum.photos/900/1200?random=1",
        "contact": "https://www.instagram.com/snap_pingpings/"
    }
};

export const PORTFOLIO_MOCK = {
    "success": true,
    "status": 200,
    "message": "성공적으로 포트폴리오 목록을 조회했습니다.",
    "code": "PORTFOLIO_200_004",
    "data": {
        "portfolios": [
            {
                "id": 34,
                "imageUrl": "https://picsum.photos/900/1200?random=6",
                "isLiked": false,
                "likesCount": 123
            },
            {
                "id": 33,
                "imageUrl": "https://picsum.photos/900/1200?random=7",
                "isLiked": false,
                "likesCount": 123
            },
            {
                "id": 32,
                "imageUrl": "https://picsum.photos/900/1200?random=8",
                "isLiked": false,
                "likesCount": 123
            },
            {
                "id": 31,
                "imageUrl": "https://picsum.photos/900/1200?random=9",
                "isLiked": false,
                "likesCount": 123
            },
        ]
    },
    "meta": {
        "nextCursor": null,
        "hasNext": false
    }
};

export const PRODUCT_MOCK = {
    "success": true,
    "status": 200,
    "message": "상품 목록 조회에 성공했습니다.",
    "code": "PRODUCT_200_006",
    "data": {
        "products": [
            {
                "id": 12,
                "imageUrl": "https://picsum.photos/900/1200?random=19",
                "title": "낭만 대학 라이프의 끝! 아름답게 장식하는 방법",
                "rate": 0.0,
                "reviewCount": 0,
                "photographer": "너와스냅",
                "price": 130000,
                "moods": [
                    "서사적인",
                    "아날로그",
                    "연출된"
                ],
                "isLiked": false
            },
            {
                "id": 11,
                "imageUrl": "https://picsum.photos/900/1200?random=29",
                "title": "[일반대학/음악대학] 알아서,잘, 딱, 깔끔하고, 센스있게",
                "rate": 0.0,
                "reviewCount": 0,
                "photographer": "모먼트픽",
                "price": 220000,
                "moods": [
                    "아날로그",
                    "서사적인",
                    "Y2K"
                ],
                "isLiked": false
            },
            {
                "id": 10,
                "imageUrl": "https://picsum.photos/900/1200?random=39",
                "title": "연습실에서 무대까지의 기록",
                "rate": 0.0,
                "reviewCount": 0,
                "photographer": "온리필름",
                "price": 100000,
                "moods": [
                    "아날로그",
                    "따스한",
                    "서사적인"
                ],
                "isLiked": false
            },
            {
                "id": 9,
                "imageUrl": "https://picsum.photos/900/1200?random=49",
                "title": "졸업날, 새로운 시작을 위한 특별한 추억",
                "rate": 0.0,
                "reviewCount": 0,
                "photographer": "온리필름",
                "price": 150000,
                "moods": [
                    "아날로그",
                    "서사적인",
                    "연출된"
                ],
                "isLiked": false
            },
            {
                "id": 8,
                "imageUrl": "https://picsum.photos/900/1200?random=59",
                "title": "아무렇게나 찍지 않습니다. 우아한 스냅",
                "rate": 0.0,
                "reviewCount": 0,
                "photographer": "오늘의컷",
                "price": 180000,
                "moods": [
                    "디지털",
                    "서사적인",
                    "연출된"
                ],
                "isLiked": false
            },
            {
                "id": 7,
                "imageUrl": "https://picsum.photos/900/1200?random=69",
                "title": "일반인도 자연스럽게 담기는 졸업스냅",
                "rate": 0.0,
                "reviewCount": 0,
                "photographer": "오늘의컷",
                "price": 150000,
                "moods": [
                    "디지털",
                    "서사적인",
                    "따스한"
                ],
                "isLiked": false
            },
            {
                "id": 5,
                "imageUrl": "https://picsum.photos/900/1200?random=79",
                "title": "무대 위의 집중을 기록합니다",
                "rate": 4.0,
                "reviewCount": 1,
                "photographer": "우리스냅",
                "price": 250000,
                "moods": [
                    "서사적인",
                    "아날로그",
                    "디지털"
                ],
                "isLiked": false
            },
            {
                "id": 4,
                "imageUrl": "https://picsum.photos/900/1200?random=89",
                "title": "청춘의 한 페이지를 담는 졸업 스냅",
                "rate": 4.0,
                "reviewCount": 1,
                "photographer": "우리스냅",
                "price": 150000,
                "moods": [
                    "청량한",
                    "아날로그",
                    "서사적인"
                ],
                "isLiked": false
            },
            {
                "id": 3,
                "imageUrl": "https://picsum.photos/900/1200?random=99",
                "title": "졸업연주회 스냅 / 리허설 스냅",
                "rate": 3.0,
                "reviewCount": 3,
                "photographer": "하루필름",
                "price": 110000,
                "moods": [
                    "아날로그",
                    "청량한",
                    "서사적인"
                ],
                "isLiked": false
            },
            {
                "id": 2,
                "imageUrl": "https://picsum.photos/900/1200?random=109",
                "title": "졸업스냅, 특별한 한 순간을 남겨드려요",
                "rate": 3.0,
                "reviewCount": 5,
                "photographer": "하루필름",
                "price": 150000,
                "moods": [
                    "청량한",
                    "디지털",
                    "따스한"
                ],
                "isLiked": false
            }
        ]
    },
    "meta": {
        "nextCursor": null,
        "hasNext": false
    }
};
