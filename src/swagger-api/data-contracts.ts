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

/** 리뷰 사진 Presigned URL 발급 요청 DTO */
export interface PostPresignedUrlRequest {
  /**
   * 원본 사진 파일명
   * @example "review_1.jpg"
   */
  fileName: string;
  /**
   * 파일 MIME 타입
   * @example "image/jpg"
   */
  contentType: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyPostPresignedUrlResponseVoid {
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
  /** 리뷰 이미지 URL 발급 응답 DTO */
  data?: PostPresignedUrlResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 리뷰 이미지 URL 발급 응답 DTO */
export interface PostPresignedUrlResponse {
  /** 리뷰 이미지를 등록할 Presigned URL */
  uploadUrl?: string;
  /** 리뷰 이미지 미리보기 조회 시 필요한 Presigned URL */
  imageUrl?: string;
  /** 리뷰 이미지 S3 Key */
  s3Key?: string;
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

/** 상품 예약 요청 DTO */
export interface ProductReservationRequest {
  /**
   * 촬영 희망 날짜
   * @format date
   * @example "2026-03-15"
   */
  date: string;
  /**
   * 촬영 시작 시간
   * @format time
   * @example "10:00"
   */
  startTime: string;
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
  /** 신규 가입 여부 */
  isNew?: boolean;
  /** 인증 시 필요한 accessToken입니다. refreshToken은 쿠키로 내려드립니다. */
  accessToken?: string;
  /** 현재 로그인한 유저 역할 */
  role?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetSwitchedUserProfileResponseVoid {
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
  /** 유저 프로필 전환 API 응답 DTO */
  data?: GetSwitchedUserProfileResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 유저 프로필 전환 API 응답 DTO */
export interface GetSwitchedUserProfileResponse {
  /** 새로 발급된 AccessToken */
  accessToken?: string;
  /** 전환된 유저 역할 */
  role?: string;
}

/** 촬영 추가 비용 DTO */
export interface ExtraPriceRequest {
  /**
   * 비용명
   * @example "원본 JPG 추가"
   */
  name?: string;
  /**
   * 금액
   * @format int32
   * @example 10000
   */
  amount?: number;
}

/** 예약 결제 요청 금액 목록 DTO */
export interface RequestPaymentReservationRequest {
  /**
   * 기본 촬영 비용
   * @format int32
   * @example 80000
   */
  basePrice: number;
  /** 추가 비용 목록 */
  extraPrices?: ExtraPriceRequest[];
  /**
   * 최종 결제 금액
   * @format int32
   * @example 90000
   */
  totalPrice: number;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyRequestPaymentReservationResponseVoid {
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
  /** 예약 결제 요청 응답 DTO */
  data?: RequestPaymentReservationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 촬영 추가 비용 DTO */
export interface ExtraPriceResponse {
  /**
   * 비용명
   * @example "원본 JPG 추가"
   */
  name?: string;
  /**
   * 금액
   * @format int32
   * @example 10000
   */
  amount?: number;
}

/** 결제 정보 DTO */
export interface PaymentResponse {
  /**
   * 기본 촬영 비용
   * @format int32
   * @example 200000
   */
  basePrice?: number;
  /** 추가 비용 목록 */
  extraPrices?: ExtraPriceResponse[];
  /**
   * 최종 결제 금액
   * @format int32
   * @example 210000
   */
  totalPrice?: number;
}

/** 예약 결제 요청 응답 DTO */
export interface RequestPaymentReservationResponse {
  /**
   * 결제 요청 처리된 예약 ID
   * @format int64
   * @example 501
   */
  reservationId?: number;
  /**
   * 변경된 예약 상태
   * @example "PAYMENT_REQUESTED"
   */
  status?:
    | "RESERVATION_REQUESTED"
    | "PHOTOGRAPHER_CHECKING"
    | "PAYMENT_REQUESTED"
    | "PAYMENT_COMPLETED"
    | "RESERVATION_CONFIRMED"
    | "RESERVATION_CANCELED"
    | "RESERVATION_REFUSED"
    | "SHOOT_COMPLETED";
  /** 결제 정보 DTO */
  payment?: PaymentResponse;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyRefuseReservationResponseVoid {
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
  /** 예약 거절 응답 DTO */
  data?: RefuseReservationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 거절 응답 DTO */
export interface RefuseReservationResponse {
  /**
   * 거절 완료된 예약 ID
   * @format int64
   * @example 51
   */
  reservationId?: number;
  /**
   * 변경된 예약 상태
   * @example "RESERVATION_REFUSED"
   */
  status?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyPayReservationResponseVoid {
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
  /** 예약 결제하기 응답 DTO */
  data?: PayReservationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 결제하기 응답 DTO */
export interface PayReservationResponse {
  /**
   * 결제 완료된 예약 아이디
   * @format int64
   * @example 501
   */
  reservationId?: number;
  /**
   * 변경된 예약 상태
   * @example "PAYMENT_COMPLETED"
   */
  status?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyConfirmReservationResponseVoid {
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
  /** 예약 확정 응답 DTO */
  data?: ConfirmReservationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 확정 응답 DTO */
export interface ConfirmReservationResponse {
  /**
   * 확정된 예약 ID
   * @format int64
   * @example 501
   */
  reservationId?: number;
  /**
   * 변경된 예약 상태
   * @example "RESERVATION_CONFIRMED"
   */
  status?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyCompleteReservationResponseVoid {
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
  /** 예약 촬영 완료/리뷰 요청 응답 DTO */
  data?: CompleteReservationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 촬영 완료/리뷰 요청 응답 DTO */
export interface CompleteReservationResponse {
  /**
   * 촬영 완료 처리된 예약 ID
   * @format int64
   * @example 501
   */
  reservationId?: number;
  /**
   * 변경된 예약 상태
   * @example "SHOOT_COMPLETED"
   */
  status?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyCancelReservationResponseVoid {
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
  /** 예약 취소 응답 DTO */
  data?: CancelReservationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 취소 응답 DTO */
export interface CancelReservationResponse {
  /**
   * 취소 처리된 예약 ID
   * @format int64
   * @example 501
   */
  reservationId?: number;
  /**
   * 취소 처리 이전의 예약 상태
   * @example "PAYMENT_REQUESTED"
   */
  previousStatus?: string;
  /**
   * 변경된 예약 상태
   * @example "RESERVATION_CANCELED"
   */
  status?: string;
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
export interface ApiResponseBodyGetReviewDetailResponseVoid {
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
  data?: GetReviewDetailResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 해당 API에서 반환하는 결과 데이터입니다. */
export interface GetReviewDetailResponse {
  /** @format int64 */
  id?: number;
  reviewer?: string;
  /** @format int32 */
  rating?: number;
  /** @format date */
  createdAt?: string;
  images?: string[];
  content?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyReservationListResponseVoid {
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
  /** 예약 목록 조회 응답 DTO */
  data?: ReservationListResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 목록 단일 응답 DTO */
export interface ReservationListItemResponse {
  /**
   * 예약 ID
   * @format int64
   * @example 51
   */
  reservationId?: number;
  /**
   * 예약 상태(진행 단계)
   * @example "RESERVATION_REQUESTED"
   */
  status?: string;
  /**
   * 예약자명
   * @example "홍길동"
   */
  client?: string;
  /**
   * 예약 생성 일시
   * @example "2026-01-12 15:00"
   */
  createdAt?: string;
  /** 예약 목록 상품 응답 DTO */
  product?: ReservationListProductResponse;
}

/** 예약 목록 상품 응답 DTO */
export interface ReservationListProductResponse {
  /**
   * 상품 ID
   * @format int64
   * @example 501
   */
  id?: number;
  /**
   * 상품 대표 이미지
   * @example "product/product_grad_12.jpg"
   */
  imageUrl?: string;
  /**
   * 상품명
   * @example "한여름밤의 스냅"
   */
  title?: string;
  /**
   * 평균 별점
   * @format double
   * @example 4.7
   */
  rate?: number;
  /**
   * 리뷰 개수
   * @format int32
   * @example 20
   */
  reviewCount?: number;
  /**
   * 상품 등록 작가명
   * @example "김작가"
   */
  photographer?: string;
  /**
   * 상품 가격
   * @format int32
   * @example 90000
   */
  price?: number;
  /** 상품 무드 태그 목록 */
  moods?: string[];
  /**
   * 리뷰 작성 여부
   * @example true
   */
  isReviewed?: boolean;
}

/** 예약 목록 조회 응답 DTO */
export interface ReservationListResponse {
  /** 예약 목록 */
  reservations?: ReservationListItemResponse[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyReservationDetailResponseVoid {
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
  /** 예약 상세 전체 응답 DTO */
  data?: ReservationDetailResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 상세 정보 DTO */
export interface ReservationDetailInfoResponse {
  /**
   * 예약자명
   * @example "홍길동"
   */
  client?: string;
  /**
   * 예약 생성 일시
   * @example "2026-02-18 10:05"
   */
  createdAt?: string;
  /**
   * 촬영 희망 날짜
   * @example "2026-03-15"
   */
  date?: string;
  /**
   * 촬영 시작 시간
   * @example "10:00"
   */
  startTime?: string;
  /**
   * 촬영 시간
   * @format double
   * @example 1.5
   */
  durationTime?: number;
  /**
   * 촬영 장소
   * @example "건국대"
   */
  place?: string;
  /**
   * 촬영 인원
   * @format int32
   * @example 2
   */
  peopleCount?: number;
  /**
   * 기타 요청 사항
   * @example "예쁘게 찍어주세요."
   */
  requestNote?: string;
}

/** 예약 상세 결제 정보 DTO */
export interface ReservationDetailPaymentResponse {
  /**
   * 기본 촬영 비용
   * @format int32
   * @example 80000
   */
  basePrice?: number;
  /** 추가 비용 */
  extraPrices?: ExtraPriceResponse[];
  /**
   * 최종 결제 금액
   * @format int32
   * @example 90000
   */
  totalPrice?: number;
}

/** 예약 상세 상품 정보 응답 DTO */
export interface ReservationDetailProductResponse {
  /**
   * 상품 ID
   * @format int64
   * @example 51
   */
  id?: number;
  /**
   * 상품 대표 이미지
   * @example "https://example.com/product301_thumb.jpg"
   */
  imageUrl?: string;
  /**
   * 상품명
   * @example "한여름밤의 스냅"
   */
  title?: string;
  /**
   * 평균 별점
   * @format double
   * @example 4.7
   */
  rate?: number;
  /**
   * 리뷰 개수
   * @format int32
   * @example 20
   */
  reviewCount?: number;
  /**
   * 상품 등록 작가
   * @example "김작가"
   */
  photographer?: string;
  /**
   * 상품 가격
   * @format int32
   * @example 90000
   */
  price?: number;
  /** 상품 무드 태그 목록 */
  moods?: string[];
}

/** 예약 상세 전체 응답 DTO */
export interface ReservationDetailResponse {
  /**
   * 예약 상태(진행 단계)
   * @example "RESERVATION_REQUESTED"
   */
  status?: string;
  /** 예약 상세 상품 정보 응답 DTO */
  productInfo?: ReservationDetailProductResponse;
  /** 예약 상세 정보 DTO */
  reservationInfo?: ReservationDetailInfoResponse;
  /** 예약 상세 결제 정보 DTO */
  paymentInfo?: ReservationDetailPaymentResponse;
  /** 예약 리뷰 상세 응답 DTO */
  reviewInfo?: ReservationDetailReviewResponse;
}

/** 예약 리뷰 상세 응답 DTO */
export interface ReservationDetailReviewResponse {
  /**
   * 리뷰 ID
   * @format int64
   * @example 40
   */
  id?: number;
  /**
   * 작성자명
   * @example "홍길동"
   */
  reviewer?: string;
  /**
   * 별점
   * @format int32
   * @example 4
   */
  rating?: number;
  /**
   * 작성일
   * @example "2026-01-08"
   */
  createdAt?: string;
  /** 이미지 url 목록 */
  images?: string[];
  /**
   * 리뷰 내용
   * @example "친절하셔서 좋았어요."
   */
  content?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyReservationPriceResponseVoid {
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
  /** 예약 상품 기본 촬영 비용 응답 DTO */
  data?: ReservationPriceResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 예약 상품 기본 촬영 비용 응답 DTO */
export interface ReservationPriceResponse {
  /**
   * 예약 ID
   * @format int64
   * @example 501
   */
  reservationId?: number;
  /**
   * 예약 상품 가격
   * @format int32
   * @example 80000
   */
  price?: number;
}

export interface GetProductListQuery {
  moodIds?: number[];
  /** @format int64 */
  photographerId?: number;
  snapCategory?:
    | "GRADUATION"
    | "WEDDING"
    | "COUPLE"
    | "DAILY"
    | "FAMILY"
    | "RECITAL";
  /** @format int64 */
  placeId?: number;
  /** @format date */
  date?: string;
  /** @format int32 */
  peopleCount?: number;
  /** @format int64 */
  cursor?: number;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetProductListResponseGetProductListMeta {
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
  /** 상품 목록 응답 DTO */
  data?: GetProductListResponse;
  /** 상품 목록 조회 응답 Meta DTO */
  meta?: GetProductListMeta;
}

/** 상품 목록 조회 개별 상품 응답 DTO */
export interface GetProductCardResponse {
  /**
   * 상품 ID
   * @format int64
   */
  id?: number;
  /** 상품 썸네일 */
  imageUrl?: string;
  /** 상품명 */
  title?: string;
  /**
   * 평균 별점
   * @format double
   */
  rate?: number;
  /**
   * 리뷰 개수
   * @format int64
   */
  reviewCount?: number;
  /** 상품 등록 작가 */
  photographer?: string;
  /**
   * 상품 가격
   * @format int32
   */
  price?: number;
  /** 상품 무드 태그 목록 */
  moods?: string[];
}

/** 상품 목록 조회 응답 Meta DTO */
export interface GetProductListMeta {
  /**
   * 다음 커서 값
   * @format int64
   */
  nextCursor?: number;
  /** 다음 커서 존재 여부 */
  hasNext?: boolean;
}

/** 상품 목록 응답 DTO */
export interface GetProductListResponse {
  /** 상품 목록 */
  products?: GetProductCardResponse[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetProductDetailResponseVoid {
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
  /** 상품 상세 조회 응답 DTO */
  data?: GetProductDetailResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 상품 상세 조회 응답 DTO */
export interface GetProductDetailResponse {
  /**
   * 상품 ID
   * @format int64
   */
  id?: number;
  /** 상품 이미지 목록 */
  images?: string[];
  /** 상품명 */
  title?: string;
  /** 좋아요 여부 */
  isLiked?: boolean;
  /**
   * 평균 별점
   * @format double
   */
  averageRate?: number;
  /**
   * 리뷰 개수
   * @format int64
   */
  reviewCount?: number;
  /**
   * 가격
   * @format int32
   */
  price?: number;
  /** 상품 조회 시 작가 응답 DTO */
  photographerInfo?: GetProductPhotographerInfoResponse;
  /** 상품 안내 정보 응답 DTO */
  productInfo?: GetProductInfoResponse;
}

/** 상품 안내 정보 응답 DTO */
export interface GetProductInfoResponse {
  /** 촬영 종류 (유형) */
  snapCategory?: string;
  /** 촬영 장소 (지역) */
  regions?: string[];
  /** 스냅 무드 */
  moods?: string[];
  /** 최대 촬영 인원 */
  maxPeople?: string;
  /** 촬영 작가 인원 */
  photographerCount?: string;
  /** 촬영 시간 (시간단위) */
  durationTime?: string;
  /** RAW 파일 제공 여부 */
  provideRaw?: string;
  /** 원본 JPG 제공 여부 */
  provideOriginalJpg?: string;
  /** 원본 JPG 제공 장수 */
  originalJpgCount?: string;
  /** 원본 제공 시점 */
  originalDeliveryTime?: string;
  /** 동영상 제공 여부 */
  provideVideo?: string;
  /** 무료 수정 횟수 */
  freeRevisionCount?: string;
  /** 최종 결과물 제공 장수 */
  finalCutCount?: string;
  /** 최종 결과물 전달 소요시간 */
  finalDeliveryTime?: string;
  /** 상품 소개 */
  description?: string;
  /** 촬영 진행 순서  */
  processDescription?: string;
  /** 사용 장비 */
  equipment?: string;
  /** 기타 주의 사항 */
  caution?: string;
}

/** 상품 조회 시 작가 응답 DTO */
export interface GetProductPhotographerInfoResponse {
  /**
   * 작가 ID
   * @format int64
   */
  id?: number;
  /** 작가 이름 */
  name?: string;
  /** 한줄 소개 */
  bio?: string;
  /** 촬영 상품 (전문 스냅 유형) */
  specialties?: string[];
  /** 활동 지역 */
  locations?: string[];
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
  /** 상품 예약 가능 시간대 응답 DTO */
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

/** 오전/오후 시간대 섹션 DTO */
export interface ProductAvailableTimeSectionResponse {
  /**
   * 시간대 구분
   * @example "am"
   */
  label?: string;
  /** 해당 시간대 슬롯 목록 */
  slots?: ProductAvailableTimeResponse[];
}

/** 상품 예약 가능 시간대 응답 DTO */
export interface ProductAvailableTimesResponse {
  /**
   * 조회 기준 날짜
   * @example "2026-03-15"
   */
  date?: string;
  /** 오전/오후 시간대 목록 */
  sections?: ProductAvailableTimeSectionResponse[];
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
export interface ApiResponseBodyProductDurationTimeResponseVoid {
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
  /** 상품 촬영 시간 조회 응답 DTO */
  data?: ProductDurationTimeResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 상품 촬영 시간 조회 응답 DTO */
export interface ProductDurationTimeResponse {
  /**
   * 촬영 최소 시간
   * @format double
   * @example 1
   */
  minDurationTime?: number;
}

/** 포폴 목록 조회 요청 DTO - 쿼리 파라미터용 */
export interface GetPortfolioListRequest {
  /** 무드 아이디 목록(,로 구분, 개수 제한 없음) */
  moodIds?: number[];
  /**
   * 상품 ID
   * @format int64
   */
  productId?: number;
  /**
   * 스냅 작가 ID
   * @format int64
   */
  photographerId?: number;
  /** 촬영 상황 (스냅 유형) */
  snapCategory?:
    | "GRADUATION"
    | "WEDDING"
    | "COUPLE"
    | "DAILY"
    | "FAMILY"
    | "RECITAL";
  /**
   * 장소 ID
   * @format int64
   */
  placeId?: number;
  /**
   * 커서 값
   * @format int64
   */
  cursor?: number;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetPortfolioListResponseGetPortfolioMetaResponse {
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
  /** 포트폴리오 목록 조회 응답 DTO */
  data?: GetPortfolioListResponse;
  /** 포트폴리오 목록 조회 메타 정보 */
  meta?: GetPortfolioMetaResponse;
}

/** 포트폴리오 카드 조회 응답 DTO */
export interface GetPortfolioCardResponse {
  /**
   * 포트폴리오 ID
   * @format int64
   */
  id?: number;
  /** 포트폴리오 이미지 url */
  imageUrl?: string;
}

/** 포트폴리오 목록 조회 응답 DTO */
export interface GetPortfolioListResponse {
  /** 포트폴리오 카드 목록 */
  portfolios?: GetPortfolioCardResponse[];
}

/** 포트폴리오 목록 조회 메타 정보 */
export interface GetPortfolioMetaResponse {
  /**
   * 다음 커서 값
   * @format int64
   */
  nextCursor?: number;
  /** 다음 커서 존재 여부 */
  hasNext?: boolean;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetPortfolioDetailResponseVoid {
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
  /** 포트폴리오 상세 조회 응답 DTO */
  data?: GetPortfolioDetailResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 포트폴리오 상세 조회 응답 DTO */
export interface GetPortfolioDetailResponse {
  /**
   * 포트폴리오 ID
   * @format int64
   */
  id?: number;
  /** 포트폴리오 한줄 소개 */
  description?: string;
  /** 이미지 URL 목록 */
  images?: string[];
  /** 좋아요 여부 */
  isLiked?: boolean;
  /**
   * 좋아요 수
   * @format int32
   */
  likeCount?: number;
  /** 촬영 종류 */
  snapCategory?: string;
  /** 촬영 장소 */
  place?: string;
  /** 촬영 시각 */
  startsAt?: string;
  /** 스냅 무드 */
  moods?: string[];
  /** 포트폴리오 작가 응답 DTO */
  photographerInfo?: GetPortfolioPhotographerInfoResponse;
  /** 상품 응답 DTO */
  productInfo?: GetPortfolioProductInfoResponse;
}

/** 포트폴리오 작가 응답 DTO */
export interface GetPortfolioPhotographerInfoResponse {
  /**
   * 작가 ID
   * @format int64
   */
  id?: number;
  /** 작가명 */
  name?: string;
  /** 작가 한줄 소개 */
  bio?: string;
  /** 작가 촬영 상품 종류 */
  specialties?: string[];
  /** 작가 활동 지역 */
  locations?: string[];
}

/** 상품 응답 DTO */
export interface GetPortfolioProductInfoResponse {
  /**
   * 상품 ID
   * @format int64
   */
  id?: number;
  /** 상품 썸네일 */
  imageUrl?: string;
  /** 상품명 */
  title?: string;
  /**
   * 리뷰 별점 평균
   * @format double
   */
  rate?: number;
  /**
   * 리뷰 수
   * @format int64
   */
  reviewCount?: number;
  /** 작가명 */
  photographer?: string;
  /**
   * 상품 기본 가격
   * @format int32
   */
  price?: number;
  /** 관련 상품 무드 */
  moods?: string[];
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetCurationResponseVoid {
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
  /** 로그인 시 큐레이션 기반 포폴 추천 목록 조회 */
  data?: GetCurationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 로그인 시 큐레이션 기반 포폴 추천 목록 조회 */
export interface GetCurationResponse {
  /** 큐레이션된 무드 태그 목록 */
  curatedMoods?: string[];
  /** 추천 포트폴리오 목록 */
  portfolios?: GetPortfolioResponse[];
}

/** 포트폴리오 이미지 응답 DTO */
export interface GetImageResponse {
  /** 이미지 URL */
  imageUrl?: string;
  /**
   * 이미지 표시 순서
   * @format int32
   */
  order?: number;
}

/** 포트폴리오 응답 DTO */
export interface GetPortfolioResponse {
  /**
   * 포트폴리오 ID
   * @format int64
   */
  id?: number;
  /** 포트폴리오 이미지 목록 */
  images?: GetImageResponse[];
  /** 포트폴리오 관련 무드 */
  moods?: string[];
  /** 작가명 */
  photographerName?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetPopularPortfolioListResponseVoid {
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
  /** 비로그인 시 인기 무드 기반 포폴 목록 추천 조회 응답 DTO */
  data?: GetPopularPortfolioListResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 비로그인 시 인기 무드 기반 포폴 목록 추천 조회 응답 DTO */
export interface GetPopularPortfolioListResponse {
  /** 인기 무드 목록 */
  popularMoods?: string[];
  /** 관련 포트폴리오 목록 */
  portfolios?: GetPopularPortfolioResponse[];
}

/** 인기 무드 기반 추천 포트폴리오 응답 DTO */
export interface GetPopularPortfolioResponse {
  /**
   * 포트폴리오 ID
   * @format int64
   */
  id?: number;
  /** 포트폴리오 이미지 목록 */
  images?: GetImageResponse[];
  /** 포트폴리오 무드 목록 */
  moods?: string[];
  /** 포트폴리오 작가명 */
  photographerName?: string;
}

/** 공통 응답 DTO */
export interface ApiResponseBodyGetPlaceListResponseVoid {
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
  /** 촬영 장소 목록 검색 API */
  data?: GetPlaceListResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 촬영 장소 목록 검색 API */
export interface GetPlaceListResponse {
  /** 검색된 촬영 장소 목록 */
  places?: GetPlaceResponse[];
}

/** 촬영 장소 검색 응답 DTO */
export interface GetPlaceResponse {
  /**
   * 촬영 장소 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 촬영 장소명
   * @example "건국대학교"
   */
  name?: string;
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
export interface ApiResponseBodyGetPlacePhotographerRecommendationResponseVoid {
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
  /** 스냅 명소 및 작가 추천 목록 조회 응답 DTO */
  data?: GetPlacePhotographerRecommendationResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 추천 장소 응답 DTO */
export interface GetPlaceInfoResponse {
  /**
   * 장소 ID
   * @format int64
   */
  id?: number;
  /** 장소 이름 */
  name?: string;
  /** 장소 이미지 url */
  imageUrl?: string;
}

/** 스냅 명소 및 작가 추천 목록 조회 응답 DTO */
export interface GetPlacePhotographerRecommendationResponse {
  /** 추천 장소 목록 */
  places?: GetPlaceInfoResponse[];
  /** 추천 작가 목록 */
  photographers?: GetRecommendationPhotographerInfoResponse[];
}

/** 추천 작가 응답 DTO */
export interface GetRecommendationPhotographerInfoResponse {
  /**
   * 작가 ID
   * @format int64
   */
  id?: number;
  /** 작가명 */
  name?: string;
  /** 작가 프로필 이미지 */
  profileImageUrl?: string;
  /** 신규 작가 여부 */
  isNew?: boolean;
  /** 작가 한 줄 소개 */
  bio?: string;
  /** 작가 촬영 상품 목록 */
  specialties?: string[];
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
export interface ApiResponseBodyGetAllCurationQuestionsResponseVoid {
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
  /** 전체 무드 큐레이션 질문 / 사진 조회 API 응답 DTO */
  data?: GetAllCurationQuestionsResponse;
  /** 해당 API의 data를 설명하는 meta data입니다. 페이지네이션 정보나, 에러 발생 시 에러 정보를 반환합니다. */
  meta?: object;
}

/** 전체 무드 큐레이션 질문 / 사진 조회 API 응답 DTO */
export interface GetAllCurationQuestionsResponse {
  /** 질문 별 내용 및 사진 모음 목록 */
  questions?: GetCurationQuestionPhotosResponse[];
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

export type PostPresignedUrlData = ApiResponseBodyPostPresignedUrlResponseVoid;

/** 리뷰 정보 */
export type CreateReviewPayload = string;

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

export type PatchUserRoleData =
  ApiResponseBodyGetSwitchedUserProfileResponseVoid;

export type UpdateReservationRequestPaymentData =
  ApiResponseBodyRequestPaymentReservationResponseVoid;

export type UpdateReservationRefuseData =
  ApiResponseBodyRefuseReservationResponseVoid;

export type UpdateReservationPaymentData =
  ApiResponseBodyPayReservationResponseVoid;

export type UpdateReservationConfirmData =
  ApiResponseBodyConfirmReservationResponseVoid;

export type UpdateReservationCompleteData =
  ApiResponseBodyCompleteReservationResponseVoid;

export type UpdateReservationCancelData =
  ApiResponseBodyCancelReservationResponseVoid;

export type GetUserInfoData = ApiResponseBodyGetUserInfoResponseVoid;

export type GetReviewDetailData = ApiResponseBodyGetReviewDetailResponseVoid;

export type GetReservationsData = ApiResponseBodyReservationListResponseVoid;

export type GetReservationDetailData =
  ApiResponseBodyReservationDetailResponseVoid;

export type GetReservationPriceData =
  ApiResponseBodyReservationPriceResponseVoid;

export type GetProductListData =
  ApiResponseBodyGetProductListResponseGetProductListMeta;

export type GetProductDetailData = ApiResponseBodyGetProductDetailResponseVoid;

export type GetProductReviewsData =
  ApiResponseBodyProductReviewsResponseProductReviewsMetaResponse;

export type GetProductClosedDatesData =
  ApiResponseBodyProductClosedDatesResponseVoid;

export type GetProductAvailableTimesData =
  ApiResponseBodyProductAvailableTimesResponseVoid;

export type GetProductPeopleRangeData =
  ApiResponseBodyProductPeopleRangeResponseVoid;

export type GetProductDurationTimeData =
  ApiResponseBodyProductDurationTimeResponseVoid;

export type GetPortfolioListData =
  ApiResponseBodyGetPortfolioListResponseGetPortfolioMetaResponse;

export type GetPortfolioDetailData =
  ApiResponseBodyGetPortfolioDetailResponseVoid;

export type GetCuratedPortfoliosData = ApiResponseBodyGetCurationResponseVoid;

export type GetPopularPortfoliosData =
  ApiResponseBodyGetPopularPortfolioListResponseVoid;

export type GetPlacesData = ApiResponseBodyGetPlaceListResponseVoid;

export type GetPhotographerProfileData =
  ApiResponseBodyGetPhotographerProfileResponseVoid;

export type GetAllMoodFiltersData =
  ApiResponseBodyGetMoodFilterListResponseVoid;

export type GetRecommendationData =
  ApiResponseBodyGetPlacePhotographerRecommendationResponseVoid;

export type GetAllCurationQuestionsData =
  ApiResponseBodyGetAllCurationQuestionsResponseVoid;

export type GetCategoriesData = ApiResponseBodyCategoriesResponseVoid;
