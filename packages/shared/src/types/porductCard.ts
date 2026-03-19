export type ProductCardProps = {
  preload?: boolean;
  image: { src: string; alt?: string };
  name: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: string[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
