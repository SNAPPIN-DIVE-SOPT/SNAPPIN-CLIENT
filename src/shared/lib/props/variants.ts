import { RecipeVariants, RuntimeFn } from "@vanilla-extract/recipes";

type AnyVariants = Record<string, Record<string, string>>;
/**
 * recipe로 생성한 스타일 함수(RuntimeFn)의 Variant 등을
 * 컴포넌트 props에서 선택적으로 사용할 수 있도록 만드는 유틸 타입입니다.
 * 예: PartialVariants<typeof buttonBase> →
 *   { status?: ..., variant?: ..., radius?: ... }
 */
export type PartialVariants<T extends RuntimeFn<AnyVariants>> = Partial<RecipeVariants<T>>;
