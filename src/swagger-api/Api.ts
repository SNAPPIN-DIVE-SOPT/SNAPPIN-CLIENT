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

import {
  CreateKakaoLoginData,
  CreateKakaoLoginRequest,
  CreateMoodCurationData,
  CreateMoodCurationRequest,
  CreatePhotoMoodConnectionData,
  CreateProductReservationData,
  CreateReissuedTokensData,
  CreateReviewData,
  CreateReviewPayload,
  GetAllMoodFiltersData,
  GetCategoriesData,
  GetCurationQuestionData,
  GetPhotographerProfileData,
  GetPlacesData,
  GetProductAvailableTimesData,
  GetProductClosedDatesData,
  GetProductPeopleRangeData,
  GetProductReviewsData,
  GetReservationsData,
  GetUserInfoData,
  GetWishedPortfoliosData,
  GetWishedProductsData,
  LogoutData,
  ProductReservationRequest,
  Type무드태그와연결할사진정보DTO,
  UpdateWishPortfolioData,
  UpdateWishProductData,
  WishPortfolioRequest,
  WishProductRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 사용자가 좋아요한 전체 상품 목록을 조회합니다.
   *
   * @tags 012 - Wish
   * @name GetWishedProducts
   * @summary 위시 상품 목록 조회
   * @request GET:/api/v1/wishes/products
   * @secure
   * @response `200` `GetWishedProductsData` OK
   */
  getWishedProducts = (params: RequestParams = {}) =>
    this.request<GetWishedProductsData, any>({
      path: `/api/v1/wishes/products`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 로그인한 사용자가 상품에 대해 좋아요를 추가하거나, 이미 좋아요를 누른 경우 취소합니다.
   *
   * @tags 012 - Wish
   * @name UpdateWishProduct
   * @summary 상품 좋아요/취소
   * @request POST:/api/v1/wishes/products
   * @secure
   * @response `200` `UpdateWishProductData` OK
   */
  updateWishProduct = (data: WishProductRequest, params: RequestParams = {}) =>
    this.request<UpdateWishProductData, any>({
      path: `/api/v1/wishes/products`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자가 좋아요한 전체 포트폴리오 목록을 조회합니다.
   *
   * @tags 012 - Wish
   * @name GetWishedPortfolios
   * @summary 위시 포트폴리오 목록 조회
   * @request GET:/api/v1/wishes/portfolios
   * @secure
   * @response `200` `GetWishedPortfoliosData` OK
   */
  getWishedPortfolios = (params: RequestParams = {}) =>
    this.request<GetWishedPortfoliosData, any>({
      path: `/api/v1/wishes/portfolios`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 로그인한 사용자가 포트폴리오에 대해 좋아요를 추가하거나, 이미 좋아요를 누른 경우 취소합니다.
   *
   * @tags 012 - Wish
   * @name UpdateWishPortfolio
   * @summary 포트폴리오 좋아요/취소
   * @request POST:/api/v1/wishes/portfolios
   * @secure
   * @response `200` `UpdateWishPortfolioData` OK
   */
  updateWishPortfolio = (
    data: WishPortfolioRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateWishPortfolioData, any>({
      path: `/api/v1/wishes/portfolios`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 촬영 완료된 예약 상품에 대해 리뷰를 작성합니다.
   *
   * @tags 010 - Reservation
   * @name CreateReview
   * @summary 리뷰 등록
   * @request POST:/api/v1/reservations/{reservationId}/reviews
   * @secure
   * @response `200` `CreateReviewData` OK
   */
  createReview = (
    reservationId: string,
    data: CreateReviewPayload,
    params: RequestParams = {},
  ) =>
    this.request<CreateReviewData, any>({
      path: `/api/v1/reservations/${reservationId}/reviews`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 고객이 선택한 정보를 바탕으로 예약을 요청합니다.
   *
   * @tags 06 - Product
   * @name CreateProductReservation
   * @summary 예약하기
   * @request POST:/api/v1/products/{productId}/reservations
   * @secure
   * @response `200` `CreateProductReservationData` OK
   */
  createProductReservation = (
    productId: string,
    data: ProductReservationRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateProductReservationData, any>({
      path: `/api/v1/products/${productId}/reservations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 람다에서 벡터로 변환된 사진과 무드 태그를 연결합니다. 웹에서 연결하는 API가 아닙니다! 람다 전용 API입니다.
   *
   * @tags 06 - Photo
   * @name CreatePhotoMoodConnection
   * @summary 사진 <-> 무드 태그 연결
   * @request POST:/api/v1/photos/process
   * @secure
   * @response `200` `CreatePhotoMoodConnectionData` OK
   */
  createPhotoMoodConnection = (
    data: Type무드태그와연결할사진정보DTO,
    params: RequestParams = {},
  ) =>
    this.request<CreatePhotoMoodConnectionData, any>({
      path: `/api/v1/photos/process`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 로그인한 사용자가 큐레이션 별로 질문 / 사진을 조회할 수 있도록 합니다.
   *
   * @tags 03 - Curation
   * @name GetCurationQuestion
   * @summary 큐레이션 단계별 질문/사진 조회 API
   * @request GET:/api/v1/curation
   * @secure
   * @response `200` `GetCurationQuestionData` OK
   */
  getCurationQuestion = (
    query: {
      /**
       * 조회할 단계
       * @min 1
       * @max 5
       * @example 1
       */
      step: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetCurationQuestionData, any>({
      path: `/api/v1/curation`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 선택한 사진에 대해 무드 큐레이션 결과를 저장하고, 결과를 반환합니다.
   *
   * @tags 03 - Curation
   * @name CreateMoodCuration
   * @summary 무드 큐레이션 결과 저장 및 결과 반환 API
   * @request POST:/api/v1/curation
   * @secure
   * @response `200` `CreateMoodCurationData` OK
   */
  createMoodCuration = (
    data: CreateMoodCurationRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateMoodCurationData, any>({
      path: `/api/v1/curation`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description accessToken 만료 시, 기존 Refresh Token 으로 새로운 accessToken 을 반환하고, 새로운 refreshToken 으로 쿠키를 교체합니다.
   *
   * @tags 01 - Auth
   * @name CreateReissuedTokens
   * @summary 토큰 재발급
   * @request POST:/api/v1/auth/reissue
   * @secure
   * @response `200` `CreateReissuedTokensData` OK
   */
  createReissuedTokens = (params: RequestParams = {}) =>
    this.request<CreateReissuedTokensData, any>({
      path: `/api/v1/auth/reissue`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description accessToken 으로 인증된 사용자를 기준으로 refreshToken 을 무효화하여 사용자를 로그아웃 처리합니다.
   *
   * @tags 01 - Auth
   * @name Logout
   * @summary 로그아웃
   * @request POST:/api/v1/auth/logout
   * @secure
   * @response `200` `LogoutData` OK
   */
  logout = (params: RequestParams = {}) =>
    this.request<LogoutData, any>({
      path: `/api/v1/auth/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 인가 코드를 받아 카카오로 소셜 로그인을 진행합니다.
   *
   * @tags 01 - Auth
   * @name CreateKakaoLogin
   * @summary 카카오 로그인
   * @request POST:/api/v1/auth/login/kakao
   * @secure
   * @response `200` `CreateKakaoLoginData` OK
   */
  createKakaoLogin = (
    data: CreateKakaoLoginRequest,
    query?: {
      /**
       * 카카오에 등록할 redirect_uri 주소입니다.
       * @example "http://localhost:8080/api/v1/auth/login/kakao"
       */
      redirect_uri?: string | null;
    },
    params: RequestParams = {},
  ) =>
    this.request<CreateKakaoLoginData, any>({
      path: `/api/v1/auth/login/kakao`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 현재 로그인한 사용자의 역할을 기반으로 사용자 정보를 조회합니다.
   *
   * @tags 01 - User
   * @name GetUserInfo
   * @summary 유저 정보 조회 API
   * @request GET:/api/v1/users/me
   * @secure
   * @response `200` `GetUserInfoData` OK
   */
  getUserInfo = (params: RequestParams = {}) =>
    this.request<GetUserInfoData, any>({
      path: `/api/v1/users/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 예약 탭에 해당하는 예약 목록을 조회합니다.
   *
   * @tags 010 - Reservation
   * @name GetReservations
   * @summary 예약 목록 조회
   * @request GET:/api/v1/reservations
   * @secure
   * @response `200` `GetReservationsData` OK
   */
  getReservations = (
    query: {
      /**
       * 예약 조회 탭
       * @example "CLIENT_OVERVIEW"
       */
      tab: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetReservationsData, any>({
      path: `/api/v1/reservations`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 커서 기반 페이지네이션 방식으로 상품 리뷰 목록을 조회합니다.
   *
   * @tags 06 - Product
   * @name GetProductReviews
   * @summary 상품 리뷰 목록 조회
   * @request GET:/api/v1/products/{productId}/reviews
   * @secure
   * @response `200` `GetProductReviewsData` OK
   */
  getProductReviews = (
    productId: string,
    query?: {
      /**
       * 다음 페이지 조회를 위한 커서 값
       * @example 6
       */
      cursor?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetProductReviewsData, any>({
      path: `/api/v1/products/${productId}/reviews`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 상품 예약 과정에서 달별 휴무일을 조회합니다.
   *
   * @tags 06 - Product
   * @name GetProductClosedDates
   * @summary 달별 휴무일 목록 조회
   * @request GET:/api/v1/products/{productId}/closed-dates
   * @secure
   * @response `200` `GetProductClosedDatesData` OK
   */
  getProductClosedDates = (
    productId: string,
    query: {
      /**
       * 조회할 연/월 (yyyy-MM)
       * @example "2026-03"
       */
      date: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetProductClosedDatesData, any>({
      path: `/api/v1/products/${productId}/closed-dates`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 상품 예약 과정에서 각 일자의 시간대별 예약 가능 여부를 조회합니다.
   *
   * @tags 06 - Product
   * @name GetProductAvailableTimes
   * @summary 시간대별 예약 가능 여부 조회
   * @request GET:/api/v1/products/{productId}/available/times
   * @secure
   * @response `200` `GetProductAvailableTimesData` OK
   */
  getProductAvailableTimes = (
    productId: string,
    query: {
      /**
       * 조회할 날짜 (yyyy-MM-dd)
       * @example "2026-03-15"
       */
      date: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetProductAvailableTimesData, any>({
      path: `/api/v1/products/${productId}/available/times`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 예약 과정에서 상품의 촬영 가능 최대/최소 인원 수를 조회합니다.
   *
   * @tags 06 - Product
   * @name GetProductPeopleRange
   * @summary 촬영 가능 인원 수 조회
   * @request GET:/api/v1/products/{productId}/available/people-range
   * @secure
   * @response `200` `GetProductPeopleRangeData` OK
   */
  getProductPeopleRange = (productId: string, params: RequestParams = {}) =>
    this.request<GetProductPeopleRangeData, any>({
      path: `/api/v1/products/${productId}/available/people-range`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 입력받은 키워드로 촬영 장소를 검색합니다.
   *
   * @tags 05 - Place
   * @name GetPlaces
   * @summary 촬영 장소 검색 API
   * @request GET:/api/v1/places
   * @secure
   * @response `200` `GetPlacesData` OK
   */
  getPlaces = (
    query: {
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetPlacesData, any>({
      path: `/api/v1/places`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 입력받은 photographerId로 해당 작가의 프로필을 조회합니다.
   *
   * @tags 02 - Photographer
   * @name GetPhotographerProfile
   * @summary 작가 상세 조회 API
   * @request GET:/api/v1/photographers/{photographerId}
   * @secure
   * @response `200` `GetPhotographerProfileData` OK
   */
  getPhotographerProfile = (
    photographerId: string,
    params: RequestParams = {},
  ) =>
    this.request<GetPhotographerProfileData, any>({
      path: `/api/v1/photographers/${photographerId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 전체 무드 필터 값을 해당 무드 카테고리, 사용자 큐레이션 진행 여부와 함께 반환합니다.
   *
   * @tags 05 - Mood
   * @name GetAllMoodFilters
   * @summary 전체 무드 필터 값 조회 API
   * @request GET:/api/v1/moods
   * @secure
   * @response `200` `GetAllMoodFiltersData` OK
   */
  getAllMoodFilters = (params: RequestParams = {}) =>
    this.request<GetAllMoodFiltersData, any>({
      path: `/api/v1/moods`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 촬영 상황 옵션으로 사용될 스냅 유형 전체 목록을 조회합니다.
   *
   * @tags 02 - Category
   * @name GetCategories
   * @summary 촬영 상황 조회
   * @request GET:/api/v1/categories
   * @secure
   * @response `200` `GetCategoriesData` OK
   */
  getCategories = (params: RequestParams = {}) =>
    this.request<GetCategoriesData, any>({
      path: `/api/v1/categories`,
      method: "GET",
      secure: true,
      ...params,
    });
}
