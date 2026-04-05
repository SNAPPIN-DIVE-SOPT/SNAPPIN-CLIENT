import { type ReservationApplicant } from '../hooks';

type ReservationInfoItem = {
  id: 'name' | 'phoneNumber' | 'email';
  label: string;
  value: string;
};

type ReservationInfoSectionProps = {
  applicant: ReservationApplicant;
};

export default function ReservationInfoSection({ applicant }: ReservationInfoSectionProps) {
  const data = applicant;

  const reservationInfoItems: ReservationInfoItem[] = [
    { id: 'name', label: '이름', value: data.name },
    { id: 'phoneNumber', label: '전화번호', value: data.phoneNumber },
    { id: 'email', label: '이메일', value: data.email },
  ];

  return (
    <section>
      <span className='text-black-10 font-16-sb'>
        예약자 정보 <span className='text-red-error'>*</span>
      </span>

      <dl className='bg-black-3 mt-[1rem] flex flex-col gap-[0.8rem] rounded-[0.6rem] p-[1.6rem]'>
        {reservationInfoItems.map(({ id, label, value }) => (
          <div key={id} className='flex items-center gap-[1.2rem]'>
            <dt className='text-black-7 caption-14-rg w-[5rem]'>{label}</dt>
            <dd className='caption-14-md text-black-10'>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
