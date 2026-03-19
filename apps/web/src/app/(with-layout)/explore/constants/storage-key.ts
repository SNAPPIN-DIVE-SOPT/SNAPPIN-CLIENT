/**
 * sessionStorage 키 간 상태 전이:
 *
 * [상세 페이지 → 뒤로가기]
 *   ExploreDetailBackBoundary: set EXPLORE_FROM_DETAIL_BACK
 *
 * [ExploreFilter mount effect (1st pass)]
 *   FROM_DETAIL_BACK=1 → set NO_AUTO_APPLY, remove FROM_DETAIL_BACK, set DETAIL_BACK_HANDLED
 *
 * [ExploreFilter mount effect (2nd pass — Strict Mode)]
 *   DETAIL_BACK_HANDLED=1 → remove DETAIL_BACK_HANDLED (NO_AUTO_APPLY 유지)
 *
 * [일반 진입 (상세 복귀 아님)]
 *   remove NO_AUTO_APPLY → curated 자동 적용 허용
 **/

export const EXPLORE_DETAIL_BACK_HANDLED = 'explore_detail_back_handled_v1';
export const EXPLORE_FROM_DETAIL_BACK = 'explore_from_detail_back_v1';
export const EXPLORE_NO_AUTO_APPLY = 'explore_no_auto_apply_v1';
export const SEARCH_SHEET_KEY = (placeName: string, initialParams: string) =>
  `search-sheet:${placeName.trim()}:${initialParams}`;
