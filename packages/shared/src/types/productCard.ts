type ProductCardImage = {
  src: string;
  alt?: string;
};

export type ProductCardProps = {
  preload?: boolean;
  image: ProductCardImage;
  name: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: string[];
  className?: string;
};
