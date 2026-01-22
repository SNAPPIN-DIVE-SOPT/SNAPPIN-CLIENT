import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ComboBox,
  ControlSheet,
  DatePicker,
  IconButton,
  Navigation,
  SheetDescription,
  SheetTitle,
  Stepper,
} from '@/ui';
import { IconClose } from '@/assets';
import { useSearchReducer } from '@/app/(with-layout)/explore/hooks/use-search-reducer';
import { SearchField } from '@/app/(with-layout)/explore/types/search';
import { parseInitialDraft, patchSearchParams } from '@/app/(with-layout)/explore/utils/query';
import { SNAP_CATEGORY } from '@/constants/categories/snap-category';
import { SearchFooter, SnapCategory } from '@/app/(with-layout)/explore/components';
import { useSearchPlaces } from '@/app/(with-layout)/explore/api';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

type SearchSheetProps = {
  open: boolean;
  onOpenChange: () => void;
};

const MIN_PARTICIPANT_COUNT = 0;
const MAX_PARTICIPANT_COUNT = 15;

export default function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlaceName = searchParams.get('placeName') ?? '';
  const [placeKeyword, setPlaceKeyword] = useState(initialPlaceName);

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
  const [currentField, setCurrentField] = useState<SearchField>('snapCategory');
  const didInitRef = useRef(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const debouncedPlaceKeyword = useDebouncedValue(placeKeyword, 300);
  const { data: places } = useSearchPlaces(debouncedPlaceKeyword);
  const placeNameToId = new Map(
    (places ?? [])
      .filter((p) => p.name && p.id != null)
      .map((p) => [p.name as string, p.id as number]),
  );

  const { snapCategory, peopleCount, date } = searchDraft;
  const formattedCount = peopleCount && peopleCount > 0 ? `${peopleCount}명` : '';

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

  const handlePlaceKeywordChange = (next: string) => {
    setPlaceKeyword(next);

    const matchedId = placeNameToId.get(next);
    if (matchedId != null) {
      setPlaceId(String(matchedId));
    } else {
      setPlaceId('');
    }
  };

  const handleSearch = () => {
    const nextParams = patchSearchParams(searchParams, searchDraft, placeKeyword);

    if (searchDraft.placeId) {
      // id가 있을 때만 (=선택 확정) placeName 저장
      nextParams.set('placeName', placeKeyword);
    } else {
      nextParams.delete('placeName');
    }

    const qs = nextParams.toString();
    const target = qs ? `/explore?${qs}` : '/explore';

    const isAlreadyExplore = pathname === '/explore';
    if (isAlreadyExplore) {
      router.replace(target);
    } else {
      router.push(target);
    }

    onOpenChange();
  };

  const handlePlaceBlur = () => {
    if (!searchDraft.placeId) {
      setPlaceKeyword('');
      setPlaceId('');
    }
  };

  const handleReset = () => {
    resetSearchDraft();
    setPlaceKeyword('');
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
            placeholder='장소·학교명을 검색 후 선택해 주세요'
            value={placeKeyword}
            options={(places ?? []).map((item) => item.name ?? '').filter(Boolean)}
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
          <DatePicker
            viewDateMonth={currentMonth}
            handleMonthChangeAction={setCurrentMonth}
            selectedDate={date ?? ''}
            handleDateChangeAction={handleDateChange}
          />
        </ControlSheet.Field>

        {/* 촬영 인원 선택 */}
        <ControlSheet.Field
          label='촬영 인원'
          selectedValue={peopleCount === 0 ? '' : formattedCount}
          onClick={() => handleFieldClick('peopleCount')}
          active={currentField === 'peopleCount'}
          wrapperClassName={
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
