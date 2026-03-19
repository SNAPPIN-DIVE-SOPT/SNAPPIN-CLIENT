import { useCallback, useMemo, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import { useSearchPlaces } from '@/app/(with-layout)/explore/api';

type PlaceId = string;

type PlaceSearchParams<Id extends PlaceId> = {
  // controlled props
  value?: string;
  onValueChange?: (next: string) => void;

  // 내부 state
  initialValue?: string;

  selectedId: Id | null | undefined;
  setSelectedId: (next: Id | null) => void;

  toId?: (rawId: number) => Id;

  debounceMs?: number;
  clearOnBlurWhenNoId?: boolean;
};

/**
 * 장소 검색 필드를 위한 공용 훅
 *
 * - 검색어 입력 (ComboBox)
 * - debounce 기반 장소 검색
 * - "이름 ↔ id" 매핑
 * - controlled / uncontrolled 입력 모두 지원
 *
 * 핵심
 * - input value(문자열)과 selectedId(id)는 **의도적으로 분리**
 * - 정확히 선택된 경우에만 selectedId가 존재
 */
export const usePlaceSearchField = <Id extends PlaceId>({
  // controlled input을 사용할 경우 value / onValueChange 제공 ex. 상위에서 keyword 상태를 관리하는 경우
  value,
  onValueChange,
  // uncontrolled input 일 때 초기값
  initialValue = '',
  // 현재 선택된 장소 id
  selectedId,
  // 장소 선택 결과를 외부 상태로 반영하기 위한 settr
  setSelectedId,
  // API에서 내려오는 number id를 외부에서 쓰는 id 타입으로 변환하기 위한 함수 ex. number -> string
  toId,
  debounceMs = 300,
  // blur 시 selectedId가 없으면 입력값을 초기화할지 여부
  clearOnBlurWhenNoId = true,
}: PlaceSearchParams<Id>) => {
  const isControlled = value != null && onValueChange != null;
  // uncontrolled 모드에서만 사용
  const [innerValue, setInnerValue] = useState(initialValue);
  // 실제 input에 바인딩될 값
  const inputValue = isControlled ? value! : innerValue;

  // input value 변경 함수
  // - controlled: onValueChange 호출
  // - uncontrolled: 내부 state 변경
  const setValue = useCallback(
    (next: string) => {
      if (isControlled) onValueChange!(next);
      else setInnerValue(next);
    },
    [isControlled, onValueChange],
  );

  // 디바운스 & 장소 검색 API
  const debouncedValue = useDebouncedValue(inputValue, debounceMs);
  const { data: places } = useSearchPlaces(debouncedValue);

  // ComboBox option 목록 (장소 이름만 전달. string[]을 받기 때문)
  const options = useMemo(() => (places ?? []).map((p) => p.name ?? '').filter(Boolean), [places]);

  // 장소 이름 -> raw id(number) 매핑
  // 정확히 일치하는 경우에만 ID 부여
  const nameToRawId = useMemo(() => {
    return new Map(
      (places ?? [])
        .filter((p) => p.name && p.id != null)
        .map((p) => [p.name as string, p.id as number]),
    );
  }, [places]);

  // raw id(number)를 외부에서 사용하는 id 타입으로 변환
  const transformId = useCallback(
    (raw: number) => (toId ? toId(raw) : (String(raw) as Id)),
    [toId],
  );

  // input value 변경 핸들러
  const handleChange = useCallback(
    (next: string) => {
      setValue(next);

      // 장소 이름과 정확히 매칭될 때만 selectedId 설정
      const matchedRawId = nameToRawId.get(next);
      if (matchedRawId != null) setSelectedId(transformId(matchedRawId));
      else setSelectedId(null);
    },
    [nameToRawId, setSelectedId, setValue, transformId],
  );

  // blur 핸들러
  const handleBlur = useCallback(() => {
    if (!clearOnBlurWhenNoId) return;
    if (selectedId == null) {
      setValue('');
      setSelectedId(null);
    }
  }, [clearOnBlurWhenNoId, selectedId, setSelectedId, setValue]);

  const reset = useCallback(() => {
    setValue('');
    setSelectedId(null);
  }, [setSelectedId, setValue]);

  return {
    value: inputValue,
    setValue,
    places,
    options,
    handleChange,
    handleBlur,
    reset,
  };
};
