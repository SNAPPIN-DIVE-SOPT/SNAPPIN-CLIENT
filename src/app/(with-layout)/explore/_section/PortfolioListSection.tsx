import Image from 'next/image';
import ImgProduct from '../../../../../public/product.png';
import { useRouter } from 'next/navigation';

export default function PortfolioListSection() {
  const router = useRouter();
  const handleImageClick = (portfolioId: number) => {
    // 상세 페이지 이동 임시 url
    router.push(`/portfolio/${portfolioId}`);
  };

  return (
    <section className='grid shrink-0 grid-cols-3 gap-[0.2rem] px-[2rem] pt-[2rem] pb-[2.533rem]'>
      {Array.from({ length: 30 }, (_, i) => (
        <button type='button' key={i} onClick={() => handleImageClick(i)}>
          <Image src={ImgProduct} alt='프리뷰 이미지' className='aspect-square w-full' />
        </button>
      ))}
    </section>
  );
}
