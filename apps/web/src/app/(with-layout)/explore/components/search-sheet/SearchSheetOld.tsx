'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ComboBox,
  ControlSheet,
  DatePicker,
  IconButton,
  Navigation,
  SheetDescription,
  SheetTitle,
  Stepper,
} from '@snappin/design-system';
import { IconClose } from '@snappin/design-system/assets';
import { useSearchReducer } from '@/app/(with-layout)/explore/hooks/use-search-reducer';
import { SearchField } from '@/app/(with-layout)/explore/types/search';
import { parseInitialDraft } from '@/app/(with-layout)/explore/utils/query';
import { SNAP_CATEGORY } from '@/constants/categories/snap-category';
import { SearchFooter, SnapCategory } from '@/app/(with-layout)/explore/components';
import { useQueryParams } from '@/hooks/useSearchQuery';
import { usePlaceSearchField } from '@/hooks/usePlaceSearchField';
import { ALLOWED_KEYS } from '@/app/(with-layout)/explore/constants/query';
import { ROUTES } from '@/constants/routes/routes';

type SearchSheetProps = {
  open: boolean;
  onOpenChange: () => void;
};

const MIN_PARTICIPANT_COUNT = 0;
const MAX_PARTICIPANT_COUNT = 15;

export default function SearchSheetOld({ open, onOpenChange }: SearchSheetProps) {
  const { read, patch, navigate, searchParams } = useQueryParams(ALLOWED_KEYS);
  const initialPlaceName = read.get('placeName');
  const [currentField, setCurrentField] = useState<SearchField>('snapCategory');
  const didInitRef = useRef(false);
  const placeFieldKey = `${open}-${initialPlaceName}`;

  const {
    searchDraft,
    setDate,
    resetSearchDraft,
    increasePeopleCount,
    decreasePeopleCount,
    setPlaceId,
    setCategory,
    setPeopleCount,
  } = useSearchReducer();

  const {
    value: placeKeyword,
    setValue: setPlaceKeyword,
    options: placeOptions,
    handleChange: handlePlaceKeywordChange,
    handleBlur: handlePlaceBlur,
    reset: resetPlaceField,
  } = usePlaceSearchField({
    initialValue: initialPlaceName,
    selectedId: searchDraft.placeId,
    setSelectedId: setPlaceId,
  });

  const { snapCategory, peopleCount, date } = searchDraft;
  const formattedCount = peopleCount && peopleCount > 0 ? `${peopleCount}명` : '0명';

  const handleFieldClick = (category: SearchField) => {
    setCurrentField(category);
  };

  const handleDateChange = (nextDate: string) => {
    if (date === nextDate) {
      setDate(null);
      return;
    }
    setDate(nextDate);
  };

  const handleSearch = () => {
    const nextParams = patch({
      snapCategory: searchDraft.snapCategory ?? null,
      placeId: searchDraft.placeId || null,
      placeName: searchDraft.placeId ? placeKeyword : null,
      date: searchDraft.date ?? null,
      peopleCount: searchDraft.peopleCount ?? null,
    });

    navigate(nextParams, { basePath: ROUTES.EXPLORE() });
    onOpenChange();
  };

  const handleReset = () => {
    resetSearchDraft();
    resetPlaceField();
  };

  useEffect(() => {
    if (!open) {
      didInitRef.current = false;
      return;
    }
    if (didInitRef.current) return;
    didInitRef.current = true;

    const { snapCategory, placeId, date, peopleCount } = parseInitialDraft(
      new URLSearchParams(searchParams.toString()),
    );

    setCategory(snapCategory);
    setPlaceId(placeId);
    setDate(date);
    setPeopleCount(peopleCount ?? 0);
  }, [open, searchParams, setCategory, setDate, setPeopleCount, setPlaceId, setPlaceKeyword]);

  return (
    <ControlSheet
      open={open}
      onOpenChange={onOpenChange}
      className='bg-black-1 left-1/2 z-1000 flex w-full max-w-[45rem] -translate-x-1/2 flex-col'
    >
      <SheetTitle hidden className='sr-only'>
        탐색 검색
      </SheetTitle>
      <SheetDescription hidden className='sr-only'>
        스냅 작가 탐색 검색 화면
      </SheetDescription>

      {/* 헤더 */}
      <Navigation
        center={<h3 className='font-16-bd whitespace-nowrap'>어떤 스냅 작가를 찾고 있나요?</h3>}
        right={
          <IconButton type='button' onClick={onOpenChange}>
            <IconClose />
          </IconButton>
        }
        className='border-black-5 border-b-[0.1rem] px-[2rem] py-[1.3rem]'
      />

      {/* 검색 필드 */}
      <div className='flex flex-col gap-[1.5rem] px-[2rem] pt-[1.5rem]'>
        {/* 촬영 상황 선택 */}
        <ControlSheet.Field
          label='촬영 상황'
          selectedValue={SNAP_CATEGORY[snapCategory as keyof typeof SNAP_CATEGORY] ?? ''}
          onClick={() => handleFieldClick('snapCategory')}
          active={currentField === 'snapCategory'}
        >
          <SnapCategory currentCategory={snapCategory} handleCategoryChange={setCategory} />
        </ControlSheet.Field>

        {/* 촬영 장소 검색 */}
        <ControlSheet.Field
          label='촬영 장소'
          selectedValue={placeKeyword}
          onClick={() => handleFieldClick('placeId')}
          active={currentField === 'placeId'}
        >
          <ComboBox
            key={placeFieldKey}
            placeholder='장소·학교명을 검색 후 선택해 주세요'
            value={placeKeyword}
            options={placeOptions}
            onChange={handlePlaceKeywordChange}
            onBlur={handlePlaceBlur}
          />
        </ControlSheet.Field>

        {/* 촬영 일정 선택 */}
        <ControlSheet.Field
          label='촬영 일정'
          selectedValue={searchDraft.date?.replaceAll('-', '.') ?? ''}
          onClick={() => handleFieldClick('date')}
          active={currentField === 'date'}
        >
          <DatePicker selectedDate={date ?? ''} handleDateChangeAction={handleDateChange} />
        </ControlSheet.Field>

        {/* 촬영 인원 선택 */}
        <ControlSheet.Field
          label='촬영 인원'
          selectedValue={peopleCount === 0 || peopleCount === null ? '' : formattedCount}
          onClick={() => handleFieldClick('peopleCount')}
          active={currentField === 'peopleCount'}
          className={
            currentField === 'peopleCount' ? 'flex-row items-center justify-between' : '' // && 사용 시 타입 에러
          }
        >
          <Stepper
            value={formattedCount}
            handleClickMinus={decreasePeopleCount}
            handleClickAdd={increasePeopleCount}
            isDisabledMinus={(peopleCount ?? 0) <= MIN_PARTICIPANT_COUNT}
            isDisabledAdd={(peopleCount ?? 0) >= MAX_PARTICIPANT_COUNT}
          />
        </ControlSheet.Field>
      </div>
      <SearchFooter handleResetClick={handleReset} handleConfirmClick={handleSearch} />
    </ControlSheet>
  );
}
