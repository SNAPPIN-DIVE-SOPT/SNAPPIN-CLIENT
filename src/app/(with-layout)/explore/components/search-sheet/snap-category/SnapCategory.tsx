import { Button } from '@/ui';
import { cn } from '@/utils/cn';
import { MOCK_SNAP_CATEGORIES } from '@/app/(with-layout)/explore/mocks/search';

type SnapCategoryProps = {
  currentCategory?: string | null;
  categories: { key: string; label: string }[];
  handleCategoryChange: (selectedCategory: string | null) => void;
};

export default function SnapCategory({
  categories,
  currentCategory,
  handleCategoryChange,
}: SnapCategoryProps) {
  const snapCategories = categories ?? MOCK_SNAP_CATEGORIES;

  const isSelected = (categoryKey: string) => currentCategory === categoryKey;

  return (
    <div className='grid grid-cols-2 gap-x-[0.5rem] gap-y-[0.7rem] rounded-[0.4rem]'>
      {snapCategories.map((category) => (
        <SnapCategoryButton
          key={category.key}
          categoryKey={category.key}
          label={category.label}
          isSelected={isSelected(category.key)}
          handleCategoryClick={handleCategoryChange}
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
  categoryKey: string;
  label: string;
  isSelected: boolean;
  handleCategoryClick: (next: string) => void;
}) => {
  return (
    <Button
      onClick={() => handleCategoryClick(categoryKey)}
      aria-label={`${label} 카테고리`}
      className={cn(
        'bg-black-3 caption-14-bd text-black-7 w-full py-[1.1rem] active:bg-none',
        isSelected && 'bg-black-10 text-black-1',
      )}
      key={categoryKey}
      color='disabled'
    >
      {label}
    </Button>
  );
};
