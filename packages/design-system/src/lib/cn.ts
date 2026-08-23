import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx로 조건부 클래스를 조합하고, tailwind-merge로 충돌하는 Tailwind 클래스를 정리합니다.
 * @param inputs 조합할 클래스 값 목록 (문자열, 조건부 객체, 배열 등)
 * @returns 병합되고 충돌이 정리된 클래스 문자열
 * @example const className = cn('px-2 py-1', isActive && 'bg-black-10', 'px-4'); // 'py-1 bg-black-10 px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
