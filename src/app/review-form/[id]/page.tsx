'use client';

import { Divider, ProductCard } from '@/ui';
import { useRouter } from 'next/navigation';
import { ClientHeader } from './components';
import { ReviewFormSection, ReviewStarSection, ImageUploadSection } from './_section';
import ClientFooter from './components/client-footer/ClientFooter';
import { useReviewWrite, REVIEW_CONTENT_MAX_LENGTH, MAX_RATING } from './hooks/useReviewWrite';
import { REVIEW_PRODUCT } from './mock/reviewProduct.mock';

export default function Page() {
  const {
    compatibleFormData,
    isValid,
    updateRating,
    updateContent,
    updateImageUrls,
    handleSubmitForm,
    validateFiles,
    compatibleErrors,
  } = useReviewWrite();

  const data = REVIEW_PRODUCT.reservations.reservation;

  const router = useRouter();

  const handleSubmit = () => {
    handleSubmitForm((review) => {
      // TODO: API 호출
      router.push(`/photo-final-detail/${data.reservationId}`);
      console.log(review);
    });
  };

  return (
    <>
      <ClientHeader />
      <section className='py-[1.6rem] pr-[4.2rem] pl-[2rem]'>
        <ProductCard
          image={{ src: data.product.imageUrl, alt: data.product.title }}
          name={data.product.title}
          rate={data.product.rate}
          reviewCount={data.product.reviewCount}
          photographer={data.product.photographer}
          price={data.product.price}
          moods={data.product.moods}
        />
      </section>
      <Divider thickness='large' color='bg-black-3' />
      <ReviewStarSection
        rating={compatibleFormData.rating}
        handleChangeRating={updateRating}
        maxRating={MAX_RATING}
      />
      <ReviewFormSection
        content={compatibleFormData.content}
        handleChangeContent={updateContent}
        errorMessage={compatibleErrors.content}
        maxLength={REVIEW_CONTENT_MAX_LENGTH}
      />
      <ImageUploadSection
        imageUrls={compatibleFormData.imageUrls}
        handleChangeImageUrls={updateImageUrls}
        validateFiles={validateFiles}
        errorMessage={compatibleErrors.imageUrls}
      />
      <ClientFooter disabled={!isValid} handleClick={handleSubmit} />
    </>
  );
}
