import { Button } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib/cn';
import type { SnapCategory } from '@/constants/categories/snap-category';
import { useGetCategories } from '@/app/(with-layout)/explore/api';
import { MOCK_SNAP_CATEGORIES } from '@/app/(with-layout)/explore/mocks/search';

type SnapCategoryProps = {
  currentCategory?: string | null;
  handleCategoryChange: (selectedCategory: SnapCategory | null) => void;
};

export default function SnapCategory({ currentCategory, handleCategoryChange }: SnapCategoryProps) {
  const { data } = useGetCategories();
  const snapCategories = data.categories ?? MOCK_SNAP_CATEGORIES;
  const isSelected = (categoryKey: string) => currentCategory === categoryKey;

  const handleCategoryClick = (next: SnapCategory) => {
    if (isSelected(next)) return handleCategoryChange(null);
    handleCategoryChange(next);
  };

  return (
    <div className='grid grid-cols-2 gap-x-[0.7rem] gap-y-[0.7rem] rounded-[0.4rem]'>
      {snapCategories.map((category) => (
        <SnapCategoryButton
          key={category.key ?? ''}
          categoryKey={(category.key as SnapCategory) ?? ''}
          label={category.label ?? ''}
          isSelected={isSelected(category.key ?? '')}
          handleCategoryClick={handleCategoryClick}
        />
      ))}
    </div>
  );
}

const SnapCategoryButton = ({
  categoryKey,
  label,
  isSelected,
  handleCategoryClick,
}: {
  categoryKey: SnapCategory;
  label: string;
  isSelected: boolean;
  handleCategoryClick: (next: SnapCategory) => void;
}) => {
  return (
    <Button
      onClick={() => handleCategoryClick(categoryKey)}
      aria-label={`${label} 移댄뀒怨좊━`}
      className={cn(
        'bg-black-3 caption-14-md text-black-7 active:bg-black-10 active:text-black-1 w-full rounded-[0.4rem] py-[1.1rem]',
        isSelected && 'bg-black-10 text-black-1',
      )}
      color='disabled'
    >
      {label}
    </Button>
  );
};
