import { cn } from "@/utils/cn";

type StoryExampleProps = {
  children: React.ReactNode;
  color: 'neon' | 'white' | 'black' | 'blue';
  size: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const colorClassMap: Record<NonNullable<StoryExampleProps['color']>, string> = {
  neon: 'bg-neon-black text-black-9',
  white: 'bg-white',
  black: 'bg-black-8',
  blue: 'bg-blue',
};

const sizeClassMap: Record<NonNullable<StoryExampleProps['size']>, string> = {
  small: 'p-4 rounded-lg caption-14-md',
  medium: 'p-8 font-16-md',
  large: 'p-12 title-20-bd',
};

export default function StoryExample({ children, color, size, onClick }: StoryExampleProps) {
  return (
    <div className={cn(colorClassMap[color], sizeClassMap[size], 'rounded-md shadow-md')} onClick={onClick}>
      {children}
    </div>
  );
}
