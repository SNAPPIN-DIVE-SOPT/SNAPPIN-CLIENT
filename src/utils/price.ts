/**
 * 가격을 콤마로 포맷팅하는 함수
 * @param price 가격
 * @returns 콤마로 포맷팅된 가격 (ex. 1000000 -> 1,000,000)
 */

export const formatPrice = (price: number) => {
  return price.toLocaleString('ko-KR');
};
