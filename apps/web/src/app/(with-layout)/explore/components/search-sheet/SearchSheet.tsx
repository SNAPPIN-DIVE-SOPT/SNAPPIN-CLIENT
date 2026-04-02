'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ComboBox,
  ControlSheet,
  Divider,
  IconButton,
  Navigation,
  SheetDescription,
  SheetTitle,
} from '@snappin/design-system';
import { IconClose } from '@snappin/design-system/assets';
import { SearchFooter } from '@/app/(with-layout)/explore/components';
import { ALLOWED_KEYS } from '@/app/(with-layout)/explore/constants/query';
import {
  INITIAL_MAX_PRICE,
  INITIAL_MIN_PRICE,
  MAX_PRICE,
  MIN_PRICE,
} from '@/app/(with-layout)/explore/constants/price';
import { useSearchReducer } from '@/app/(with-layout)/explore/hooks/use-search-reducer';
import MoodFilter from '@/app/(with-layout)/explore/components/search-sheet/mood-filter/MoodFilter';
import PriceSlider from '@/app/(with-layout)/explore/components/search-sheet/price-slider/PriceSlider';
import {
  parseInitialDraft,
  parseMoodIds,
  parsePriceRange,
} from '@/app/(with-layout)/explore/utils/query';
import { usePlaceSearchField } from '@/hooks/usePlaceSearchField';
import { useQueryParams } from '@/hooks/useSearchQuery';
import { ROUTES } from '@/constants/routes/routes';

type SearchSheetProps = {
  open: boolean;
  onOpenChange: () => void;
};

export default function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  const { read, patch, navigate, searchParams } = useQueryParams(ALLOWED_KEYS);
  const initialPlaceName = read.get('placeName');
  const placeFieldKey = `${open}-${initialPlaceName}`;
  const initialMoodIds = parseMoodIds(searchParams);
  const initialPrices = parsePriceRange(searchParams);
  const formKey = `${open}-${searchParams.toString()}`;

  return (
    <SearchSheetContent
      key={formKey}
      open={open}
      onOpenChange={onOpenChange}
      searchParams={searchParams}
      patch={patch}
      navigate={navigate}
      initialPlaceName={initialPlaceName}
      placeFieldKey={placeFieldKey}
      initialMoodIds={initialMoodIds}
      initialPrices={initialPrices}
    />
  );
}

type SearchSheetContentProps = SearchSheetProps & {
  searchParams: URLSearchParams;
  patch: ReturnType<typeof useQueryParams>['patch'];
  navigate: ReturnType<typeof useQueryParams>['navigate'];
  initialPlaceName: string;
  placeFieldKey: string;
  initialMoodIds: number[];
  initialPrices: [number, number];
};

function SearchSheetContent({
  open,
  onOpenChange,
  searchParams,
  patch,
  navigate,
  initialPlaceName,
  placeFieldKey,
  initialMoodIds,
  initialPrices,
}: SearchSheetContentProps) {
  const didInitRef = useRef(false);
  const [selectedMoodIds, setSelectedMoodIds] = useState<number[]>(initialMoodIds);
  const [prices, setPrices] = useState<[number, number]>(initialPrices);

  const { searchDraft, setDate, resetSearchDraft, setPlaceId, setCategory, setPeopleCount } =
    useSearchReducer();

  const {
    value: placeKeyword,
    options: placeOptions,
    handleChange: handlePlaceKeywordChange,
    handleBlur: handlePlaceBlur,
    reset: resetPlaceField,
  } = usePlaceSearchField({
    initialValue: initialPlaceName,
    selectedId: searchDraft.placeId,
    setSelectedId: setPlaceId,
  });

  const handleToggleMood = (moodId: number) => {
    setSelectedMoodIds((prevMoodIds) =>
      prevMoodIds.includes(moodId)
        ? prevMoodIds.filter((selectedMoodId) => selectedMoodId !== moodId)
        : [...prevMoodIds, moodId],
    );
  };

  const handleSearch = () => {
    const nextParams = patch({
      moodIds: selectedMoodIds.length > 0 ? selectedMoodIds.join(',') : null,
      minPrice: prices[0] === MIN_PRICE ? null : prices[0],
      maxPrice: prices[1] === MAX_PRICE ? null : prices[1],
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
    setSelectedMoodIds([]);
    setPrices([INITIAL_MIN_PRICE, INITIAL_MAX_PRICE]);
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
  }, [open, searchParams, setCategory, setDate, setPeopleCount, setPlaceId]);

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

      <Navigation
        center={<h3 className='caption-14-bd whitespace-nowrap'>어떤 스냅 작가를 찾고 있나요?</h3>}
        right={
          <IconButton type='button' onClick={onOpenChange}>
            <IconClose />
          </IconButton>
        }
        className='px-[2rem] py-[1.3rem]'
      />
      <div className='mt-[2.1rem] flex flex-col gap-[3.5rem]'>
        <ControlSheet.Field label='촬영 장소' active={true} className='border-none px-[2.5rem]'>
          <ComboBox
            key={placeFieldKey}
            placeholder='장소 이름을 검색해 주세요'
            value={placeKeyword}
            options={placeOptions}
            onChange={handlePlaceKeywordChange}
            onBlur={handlePlaceBlur}
            inputClassName='border-b-[0.1rem] px-[0.7rem] py-[1.2rem] border-black-6 focus:border-black-10'
          />
        </ControlSheet.Field>

        <Divider color='bg-black-4' />

        <ControlSheet.Field label='무드 선택' active={true} variant='plain' className='px-[2.5rem]'>
          <MoodFilter selectedMoodIds={selectedMoodIds} onToggleMoodAction={handleToggleMood} />
        </ControlSheet.Field>

        <Divider color='bg-black-4' />

        <ControlSheet.Field label='촬영 가격' active={true} variant='plain' className='px-[2.5rem]'>
          <PriceSlider value={prices} onChange={setPrices} />
        </ControlSheet.Field>
      </div>
      <SearchFooter handleResetClick={handleReset} handleConfirmClick={handleSearch} />
    </ControlSheet>
  );
}
