import { ProductFrameProps } from '@/ui/frame/product/ProductFrame';

export const PRODUCT_MOCK = {
    "id": 25,
    "images": [
        "https://picsum.photos/900/1200?random=1",
        "https://picsum.photos/900/1200?random=2",
        "https://picsum.photos/900/1200?random=3",
        "https://picsum.photos/900/1200?random=4",
        "https://picsum.photos/900/1200?random=5"
    ],
    "title": "졸업스냅, 특별한 한 순간을 남겨드려요",
    "isLiked": false,
    "likeCount": 11,
    "averageRate": 3.0,
    "reviewCount": 5,
    "price": 150000,
    "photographerInfo": {
        "id": 2,
        "name": "하루필름",
        "bio": "대학생활 마지막을 책임집니다",
        "specialties": [
            "졸업스냅",
            "연주스냅"
        ],
        "locations": [
            "서울"
        ],
        "profileImageUrl": "https://picsum.photos/300/300?random=1",
        "contact": "https://www.instagram.com/snap_pingpings/"
    },
    "productInfo": {
        "snapCategory": "졸업스냅",
        "regions": [
            "서울"
        ],
        "moods": [
            "청량한",
            "Y2K",
            "몽환적인"
        ],
        "maxPeople": "3명",
        "photographerCount": "2명",
        "durationTime": "2시간 30분",
        "provideRaw": "전달 불가",
        "provideOriginalJpg": null,
        "originalJpgCount": "원본 전체",
        "originalDeliveryTime": "촬영일 기준 1~2일 이내",
        "provideVideo": "전달 가능",
        "freeRevisionCount": "2회",
        "finalCutCount": "8장",
        "addCount": "1장당 1만원",
        "finalDeliveryTime": "2주",
        "description": "저는 제가 본 그 순간의 분위기, 풍경을 사진에 담아내려 합니다.\n그렇기에 함께 작업하게 되실 분과 무겁지 않은, 가볍고 즐거운 촬영이 되었으면 합니다.",
        "paidOptions": [
            "provideRaw",
            "provideVideo",
            "finalCutCount"
        ]
    }
};

export const PORTFOLIO_MOCK = {
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
};

export const PRODUCT_LIST_MOCK: ProductFrameProps[] = [
    {
        id: 25,
        isLiked: false,
        photographer: '하루필름',
        moods: ['청량한', 'Y2K', '몽환적인'],
        rate: 3.0,
        reviewCount: 5,
        price: 150000,
        name: '졸업스냅, 특별한 한 순간을 남겨드려요',
        image: {
            src: 'https://picsum.photos/900/1200?random=10',
            alt: '졸업스냅, 특별한 한 순간을 남겨드려요 상품 이미지',
        },
    },
    {
        id: 26,
        isLiked: true,
        photographer: '스냅모먼트',
        moods: ['따뜻한', '자연스러운'],
        rate: 4.8,
        reviewCount: 18,
        price: 190000,
        name: '캠퍼스에서 남기는 자연스러운 졸업 스냅',
        image: {
            src: 'https://picsum.photos/900/1200?random=11',
            alt: '캠퍼스에서 남기는 자연스러운 졸업 스냅 상품 이미지',
        },
    },
    {
        id: 27,
        isLiked: false,
        photographer: '어반스튜디오',
        moods: ['시크한', '도시적인'],
        rate: 4.5,
        reviewCount: 9,
        price: 170000,
        name: '도시 무드로 담아내는 프리미엄 스냅',
        image: {
            src: 'https://picsum.photos/900/1200?random=12',
            alt: '도시 무드로 담아내는 프리미엄 스냅 상품 이미지',
        },
    },
];
