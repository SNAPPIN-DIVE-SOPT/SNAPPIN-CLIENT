/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 상품 좋아요/취소 요청 DTO */
export interface WishProductRequest {
  /**
   * 좋아요/취소할 상품 아이디
   * @format int64
   * @example 1
   */
  productId: number;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyWishProductResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 상품 좋아요/취소 응답 DTO */
  data?: WishProductResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 상품 좋아요/취소 응답 DTO */
export interface WishProductResponse {
  /**
   * 상품 아이디
   * @format int64
   * @example 101
   */
  productId?: number;
  /**
   * 좋아요 상태 (요청 처리 후)
   * @example true
   */
  liked?: boolean;
}

/** 포트폴리오 좋아요/취소 요청 DTO */
export interface WishPortfolioRequest {
  /**
   * 좋아요/취소할 포트폴리오 아이디
   * @format int64
   * @example 1
   */
  portfolioId: number;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyWishPortfolioResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 포트폴리오 좋아요/취소 응답 DTO */
  data?: WishPortfolioResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 포트폴리오 좋아요/취소 응답 DTO */
export interface WishPortfolioResponse {
  /**
   * 포트폴리오 아이디
   * @format int64
   * @example 101
   */
  portfolioId?: number;
  /**
   * 좋아요 상태 (요청 처리 후)
   * @example true
   */
  liked?: boolean;
}

/** 예약 리뷰 등록 요청 DTO */
export interface CreateReservationReviewRequest {
  /**
   * 리뷰 별점
   * @format int32
   * @min 1
   * @max 5
   * @example 5
   */
  rating: number;
  /**
   * 리뷰 내용
   * @example "촬영이 너무 만족스러웠어요!"
   */
  content: string;
  /**
   * 리뷰 이미지 URL 목록
   * @example ["https://cdn.example.com/review/1.jpg","https://cdn.example.com/review/2.jpg"]
   */
  imageUrls?: (string | null)[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyCreateReservationReviewResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 예약 리뷰 등록 응답 DTO */
  data?: CreateReservationReviewResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 리뷰 등록 응답 DTO */
export interface CreateReservationReviewResponse {
  /**
   * 생성된 리뷰 ID
   * @format int64
   * @example 301
   */
  reviewId?: number;
  /**
   * 리뷰가 등록된 예약 ID
   * @format int64
   * @example 501
   */
  reservationId?: number;
}

/**
 * 촬영 시작 시간
 * @example "10:00"
 */
export interface LocalTime {
  /** @format int32 */
  hour?: number;
  /** @format int32 */
  minute?: number;
  /** @format int32 */
  second?: number;
  /** @format int32 */
  nano?: number;
}

/** 상품 예약 요청 DTO */
export interface ProductReservationRequest {
  /**
   * 촬영 희망 날짜
   * @format date
   * @example "2026-03-15"
   */
  date: string;
  /** 촬영 시작 시간 */
  startTime: LocalTime;
  /**
   * 촬영 시간 (0.5시간 단위)
   * @format double
   * @example 2.5
   */
  durationTime: number;
  /**
   * 촬영 장소 아이디
   * @format int64
   * @example 1
   */
  placeId: number;
  /**
   * 촬영 인원
   * @format int32
   * @example 2
   */
  peopleCount: number;
  /**
   * 기타 요청 사항
   * @example "단체 사진 위주로 촬영 요청드립니다."
   */
  requestNote?: string | null;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyProductReservationResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 상품 예약 응답 DTO */
  data?: ProductReservationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 상품 예약 응답 DTO */
export interface ProductReservationResponse {
  /**
   * 생성된 예약 ID
   * @format int64
   * @example 501
   */
  reservationId?: number;
  /**
   * 예약 상태
   * @example "RESERVATION_REQUESTED"
   */
  status?: string;
}

export interface Type무드태그와연결할사진정보DTO {
  "사진의 S3 key 값": string;
  "사진의 벡터 변환 값": number[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyVoidVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 해당 API에서 반환하는 결과 데이터입니다. */
  data?: object;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 무드 큐레이션 결과 저장 요청 DTO */
export interface CreateMoodCurationRequest {
  /**
   * 사용자가 선택한 사진 ID 목록
   * @example [1,2,3,4,5]
   */
  photoIds: number[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyCreateMoodCurationResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 무드 큐레이션 결과 응답 DTO */
  data?: CreateMoodCurationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 무드 큐레이션 결과 응답 DTO */
export interface CreateMoodCurationResponse {
  /**
   * 사용자 이름
   * @example "김소연"
   */
  userName?: string;
  /** 무드 큐레이션 결과 목록 */
  moods?: CreateMoodResponse[];
}

/** 사용자 맞춤 무드 결과 DTO */
export interface CreateMoodResponse {
  /**
   * 무드 태그 id
   * @format int64
   */
  id?: number;
  /** 무드 태그 이름 */
  name?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyCreateAccessTokenResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 해당 API에서 반환하는 결과 데이터입니다. */
  data?: CreateAccessTokenResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 해당 API에서 반환하는 결과 데이터입니다. */
export interface CreateAccessTokenResponse {
  accessToken?: string;
}

/** 카카오 로그인 요청 DTO */
export interface CreateKakaoLoginRequest {
  /**
   * 인가 코드
   * @example "il3uaRxUwljpgZy_YUYHqR_YhhyqV2WShVDq_k2m-m8TFWMDwlC-kAAAAAQKFwHPAAABm5kN17ctjdRiIM79qQ"
   */
  code: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyCreateKakaoLoginResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 카카오 로그인 응답 DTO */
  data?: CreateKakaoLoginResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 카카오 로그인 응답 DTO */
export interface CreateKakaoLoginResponse {
  /** 인증 시 필요한 accessToken입니다. refreshToken은 쿠키로 내려드립니다. */
  accessToken?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyWishedProductsResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 위시 상품 목록 조회 응답 DTO */
  data?: WishedProductsResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 위시 상품 단일 응답 DTO */
export interface WishedProductResponse {
  /**
   * 상품 아이디
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 상품 대표 이미지 URL
   * @example "https://example.com/product1.jpg"
   */
  imageUrl?: string;
  /**
   * 상품명
   * @example "인물 스냅 촬영"
   */
  title?: string;
  /**
   * 평균 별점
   * @format double
   * @example 4.8
   */
  rate?: number;
  /**
   * 리뷰 개수
   * @format int32
   * @example 23
   */
  reviewCount?: number;
  /**
   * 상품 등록 작가
   * @example "김사진"
   */
  photographer?: string;
  /**
   * 상품 가격
   * @format int32
   * @example 150000
   */
  price?: number;
  /**
   * 상품 무드 태그 목록
   * @example ["따뜻한","자연스러운","투명한"]
   */
  moods?: string[];
}

/** 위시 상품 목록 조회 응답 DTO */
export interface WishedProductsResponse {
  /** 좋아요한 상품 목록 */
  products?: WishedProductResponse[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyWishedPortfoliosResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 위시 포트폴리오 목록 조회 응답 DTO */
  data?: WishedPortfoliosResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 위시 포트폴리오 단일 응답 DTO */
export interface WishedPortfolioResponse {
  /**
   * 포트폴리오 아이디
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 포트폴리오 대표 이미지 URL
   * @example "https://example.com/portfolio1.jpg"
   */
  imageUrl?: string;
}

/** 위시 포트폴리오 목록 조회 응답 DTO */
export interface WishedPortfoliosResponse {
  /** 좋아요한 포트폴리오 목록 */
  portfolios?: WishedPortfolioResponse[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetUserInfoResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 유저 정보 조회 응답 DTO */
  data?: GetUserInfoResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 고객 정보 응답 DTO */
export interface GetClientInfoResponse {
  /** 고객명 */
  name?: string;
  /** 고객 큐레이션 무드 결과 목록 */
  curatedMoods?: string[];
}

/** 작가 정보 응답 DTO */
export interface GetPhotographerInfoResponse {
  /** 작가명 */
  name?: string;
  /** 한줄 소개 */
  bio?: string;
  /** 작가 촬영 상품 */
  specialties?: string[];
  /** 작가 활동 지역 */
  locations?: string[];
}

/** 유저 정보 조회 응답 DTO */
export interface GetUserInfoResponse {
  /**
   * 유저 ID
   * @format int64
   */
  id?: number;
  /** 현재 로그인된 유저 역할 */
  role?: string;
  /** 유저 프로필 이미지 */
  profileImageUrl?: string;
  /** 작가 프로필 보유 여부 */
  hasPhotographerProfile?: boolean;
  /** 고객 정보 응답 DTO */
  clientInfo?: GetClientInfoResponse;
  /** 작가 정보 응답 DTO */
  photographerInfo?: GetPhotographerInfoResponse;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyProductReviewsResponseProductReviewsMetaResponse {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 상품 리뷰 커서 기반 목록 응답 DTO */
  data?: ProductReviewsResponse;
  /** 상품 리뷰 커서 기반 조회 메타 정보 DTO */
  meta?: ProductReviewsMetaResponse;
}

/** 상품 리뷰 응답 DTO */
export interface ProductReviewResponse {
  /**
   * 리뷰 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 리뷰 작성자
   * @example "작성자"
   */
  reviewer?: string;
  /**
   * 평점
   * @format int32
   * @example 5
   */
  rating?: number;
  /**
   * 작성 일자
   * @format date
   * @example "2026-03-01"
   */
  createdAt?: string;
  /** 리뷰 이미지 URL 목록 */
  images?: string[];
  /**
   * 리뷰 내용
   * @example "리뷰 내용"
   */
  content?: string;
}

/** 상품 리뷰 커서 기반 조회 메타 정보 DTO */
export interface ProductReviewsMetaResponse {
  /**
   * 다음 커서 값
   * @format int64
   * @example 6
   */
  nextCursor?: number | null;
  /**
   * 다음 페이지 존재 여부
   * @example true
   */
  hasNext?: boolean;
}

/** 상품 리뷰 커서 기반 목록 응답 DTO */
export interface ProductReviewsResponse {
  /** 상품 리뷰 목록 */
  reviews?: ProductReviewResponse[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyProductClosedDatesResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 상품 달별 휴무일 조회 응답 DTO */
  data?: ProductClosedDatesResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 상품 달별 휴무일 조회 응답 DTO */
export interface ProductClosedDatesResponse {
  /**
   * 해당 월의 휴무일 목록 (yyyy-MM-dd)
   * @example ["2026-03-03","2026-03-10","2026-03-17"]
   */
  closedDates?: string[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyProductAvailableTimesResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 상품 예약 가능 시간대 목록 응답 DTO */
  data?: ProductAvailableTimesResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 상품 예약 가능 단일 시간대 응답 DTO */
export interface ProductAvailableTimeResponse {
  /**
   * 타임슬롯 시작 시간
   * @example ""09:00""
   */
  time?: string;
  /**
   * 예약 가능 여부
   * @example true
   */
  isAvailable?: boolean;
}

/** 상품 예약 가능 시간대 목록 응답 DTO */
export interface ProductAvailableTimesResponse {
  /**
   * 조회 기준 날짜
   * @example "2026-03-15"
   */
  date?: string;
  /** 시간대별 예약 가능 여부 목록 */
  times?: ProductAvailableTimeResponse[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyProductPeopleRangeResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 촬영 가능 인원 수 조회 응답 DTO */
  data?: ProductPeopleRangeResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 촬영 가능 인원 수 조회 응답 DTO */
export interface ProductPeopleRangeResponse {
  /**
   * 최소 인원
   * @format int32
   * @example 1
   */
  minPeople?: number;
  /**
   * 최대 인원
   * @format int32
   * @example 5
   */
  maxPeople?: number;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetPhotographerProfileResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 작가 상세 조회 응답 DTO */
  data?: GetPhotographerProfileResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 작가 상세 조회 응답 DTO */
export interface GetPhotographerProfileResponse {
  /**
   * 작가 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 작가가 설정한 작가명
   * @example "스윙스냅"
   */
  name?: string;
  /**
   * 작가 한 줄 소개
   * @example "일상의 아름다움을 포착합니다"
   */
  bio?: string;
  /**
   * 촬영 상품
   * @example ["졸업스냅","웨딩스냅"]
   */
  specialties?: string[];
  /**
   * 활동 지역
   * @example ["서울","인천"]
   */
  locations?: string[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetMoodFilterListResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 전체 무드 필터 값 조회 응답 DTO */
  data?: GetMoodFilterListResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 전체 무드 필터 값 조회 응답 DTO */
export interface GetMoodFilterListResponse {
  /** 무드 값 목록 */
  moods?: GetMoodFilterResponse[];
}

/** 무드 필터 응답 DTO */
export interface GetMoodFilterResponse {
  /**
   * 무드 ID
   * @format int64
   */
  id?: number;
  /** 해당 무드가 속해있는 카테고리 */
  category?: string;
  /** 무드 이름 */
  name?: string;
  /** 사용자 무드 큐레이션 결과 여부 */
  isCurated?: boolean;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetCurationQuestionPhotosResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 무드 큐레이션 단계별 질문/사진 조회 DTO */
  data?: GetCurationQuestionPhotosResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 무드 큐레이션 단계별 질문/사진 조회 DTO */
export interface GetCurationQuestionPhotosResponse {
  /** 질문 내용 DTO */
  question?: GetQuestionResponse;
  /** 관련 사진 DTO */
  photos?: GetPhotoResponse[];
}

/** 질문과 연관된 사진 응답 DTO */
export interface GetPhotoResponse {
  /**
   * 사진 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 사진 presigned url
   * @example "https://abc.com"
   */
  imageUrl?: string;
  /**
   * 사진 순서
   * @format int32
   * @example 1
   */
  order?: number;
}

/** 질문 내용 DTO */
export interface GetQuestionResponse {
  /**
   * 질문 id
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 질문 내용
   * @example "어떤 장소 무드를 선호하시나요?"
   */
  contents?: string;
  /**
   * 질문 단계
   * @format int32
   * @example 1
   */
  step?: number;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyCategoriesResponseVoid {
  /** 해당 API의 성공 여부를 반환합니다. true면 성공, false면 실패입니다. */
  success?: boolean;
  /**
   * 해당 API의 HTTP 상태 코드입니다.
   * @format int32
   */
  status?: number;
  /** 해당 API의 결과에 대한 상태 메시지입니다. */
  message?: string;
  /**
   * 해당 API 관련 커스텀 코드입니다. 도메인(3글자)-상태코드-순번 으로 이루어져 있습니다.
   * @example "TIC_200_001"
   */
  code?: string;
  /** 촬영 상황 카테고리 목록 응답 DTO */
  data?: CategoriesResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 촬영 상황 카테고리 목록 응답 DTO */
export interface CategoriesResponse {
  /** 촬영 상황 카테고리 목록 */
  categories?: CategoryResponse[];
}

/** 촬영 상황 카테고리 응답 DTO */
export interface CategoryResponse {
  /**
   * 카테고리 키(영문)
   * @example "GRADUATION"
   */
  key?: string;
  /**
   * 카테고리 라벨(한글)
   * @example "졸업스냅"
   */
  label?: string;
}

export type GetWishedProductsData = ApiResponseBodyWishedProductsResponseVoid;

export type UpdateWishProductData = ApiResponseBodyWishProductResponseVoid;

export type GetWishedPortfoliosData =
  ApiResponseBodyWishedPortfoliosResponseVoid;

export type UpdateWishPortfolioData = ApiResponseBodyWishPortfolioResponseVoid;

export type CreateReviewData =
  ApiResponseBodyCreateReservationReviewResponseVoid;

export type CreateProductReservationData =
  ApiResponseBodyProductReservationResponseVoid;

export type CreatePhotoMoodConnectionData = ApiResponseBodyVoidVoid;

export type GetCurationQuestionData =
  ApiResponseBodyGetCurationQuestionPhotosResponseVoid;

export type CreateMoodCurationData =
  ApiResponseBodyCreateMoodCurationResponseVoid;

export type CreateReissuedTokensData =
  ApiResponseBodyCreateAccessTokenResponseVoid;

export type LogoutData = ApiResponseBodyVoidVoid;

export type CreateKakaoLoginData = ApiResponseBodyCreateKakaoLoginResponseVoid;

export type GetUserInfoData = ApiResponseBodyGetUserInfoResponseVoid;

export type GetProductReviewsData =
  ApiResponseBodyProductReviewsResponseProductReviewsMetaResponse;

export type GetProductClosedDatesData =
  ApiResponseBodyProductClosedDatesResponseVoid;

export type GetProductAvailableTimesData =
  ApiResponseBodyProductAvailableTimesResponseVoid;

export type GetProductPeopleRangeData =
  ApiResponseBodyProductPeopleRangeResponseVoid;

export type GetPhotographerProfileData =
  ApiResponseBodyGetPhotographerProfileResponseVoid;

export type GetAllMoodFiltersData =
  ApiResponseBodyGetMoodFilterListResponseVoid;

export type GetCategoriesData = ApiResponseBodyCategoriesResponseVoid;
