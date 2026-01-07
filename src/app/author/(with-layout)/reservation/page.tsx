import { StateCode } from '@/types/stateCode';
import NavigationClient from './components/navigation-client/Navigation.client';
import ReservationCard from './components/reservation-card/ReservationCard';
import { RESERVATION_MOCK } from './mock/reservation.mock';
import { MoodCode } from '@/types/moodCode';
import { Divider } from '@/ui';

export default function page() {
  const data = RESERVATION_MOCK;

  return (
    <div className='flex flex-col'>
      <NavigationClient />
      {/* TODO: tab */}
      <div className='flex flex-col p-[2rem]'></div>
      <div className='flex flex-col gap-[1.2rem]'>
        {data.products.map((product, index) => (
          <div key={product.id}>
            <ReservationCard
              key={product.id}
              id={product.id}
              status={product.status as StateCode}
              image={{ src: product.imageUrl, alt: product.title }}
              name={product.title}
              rating={product.rate}
              reviewCount={product.reviewCount}
              author={product.photographer}
              price={product.price}
              tags={product.moods as MoodCode[]}
            />
            {index !== data.products.length - 1 && <Divider thickness='large' color='bg-black-3' />}
          </div>
        ))}
      </div>
    </div>
  );
}
