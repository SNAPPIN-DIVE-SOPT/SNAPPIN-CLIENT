import { useReducer } from 'react';
import { SearchDraft } from '@/app/(with-layout)/explore/types/search';

export const initialState: SearchDraft = {
  snapCategory: null,
  placeId: null,
  date: null,
  peopleCount: null,
};

type Action =
  | { type: 'SET_SNAP_CATEGORY'; payload: string | null }
  | { type: 'SET_PLACE_ID'; payload: string | null }
  | { type: 'SET_DATE'; payload: string | null }
  | { type: 'SET_PEOPLE_COUNT'; payload: number }
  | { type: 'INCREASE_PEOPLE_COUNT' }
  | { type: 'DECREASE_PEOPLE_COUNT' }
  | { type: 'RESET' };

export const searchReducer = (state: SearchDraft, action: Action): SearchDraft => {
  switch (action.type) {
    case 'SET_SNAP_CATEGORY':
      return { ...state, snapCategory: action.payload };
    case 'SET_PLACE_ID':
      return { ...state, placeId: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_PEOPLE_COUNT':
      return { ...state, peopleCount: action.payload };
    case 'INCREASE_PEOPLE_COUNT':
      return {
        ...state,
        peopleCount: (state.peopleCount ?? 0) + 1,
      };
    case 'DECREASE_PEOPLE_COUNT':
      return {
        ...state,
        peopleCount: Math.max(0, (state.peopleCount ?? 0) - 1),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const useSearchReducer = () => {
  const [searchDraft, dispatch] = useReducer(searchReducer, initialState);

  const setCategory = (category: string | null) => {
    dispatch({ type: 'SET_SNAP_CATEGORY', payload: category });
  };

  const setPlaceId = (placeId: string | null) => {
    dispatch({ type: 'SET_PLACE_ID', payload: placeId });
  };

  const setDate = (date: string | null) => {
    dispatch({ type: 'SET_DATE', payload: date });
  };

  const setPeopleCount = (peopleCount: number) => {
    dispatch({ type: 'SET_PEOPLE_COUNT', payload: peopleCount });
  };

  const increasePeopleCount = () => {
    dispatch({ type: 'INCREASE_PEOPLE_COUNT' });
  };

  const decreasePeopleCount = () => {
    dispatch({ type: 'DECREASE_PEOPLE_COUNT' });
  };

  const resetSearchDraft = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    searchDraft,
    setCategory,
    setPlaceId,
    setDate,
    setPeopleCount,
    increasePeopleCount,
    decreasePeopleCount,
    resetSearchDraft,
  };
};
