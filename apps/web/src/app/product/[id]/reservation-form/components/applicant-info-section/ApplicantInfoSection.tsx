import { type ReservationApplicant } from '@/app/product/[id]/reservation-form/types/copy';

type ApplicantInfoItem = {
  id: 'name' | 'phoneNumber' | 'email';
  label: string;
  value: string;
};

type ApplicantInfoSectionProps = {
  applicant: ReservationApplicant;
};

export default function ApplicantInfoSection({ applicant }: ApplicantInfoSectionProps) {
  const applicantInfoItems: ApplicantInfoItem[] = [
    { id: 'name', label: '이름', value: applicant.name },
    { id: 'phoneNumber', label: '전화번호', value: applicant.phoneNumber },
    { id: 'email', label: '이메일', value: applicant.email },
  ];

  return (
    <section>
      <h1 className='text-black-10 font-16-sb'>
        예약자 정보 <span className='text-red-error'>*</span>
      </h1>

      <dl className='bg-black-3 mt-[1rem] flex flex-col gap-[0.8rem] rounded-[0.6rem] p-[1.6rem]'>
        {applicantInfoItems.map(({ id, label, value }) => (
          <div key={id} className='flex items-center gap-[1.2rem]'>
            <dt className='text-black-7 caption-14-rg w-[5rem]'>{label}</dt>
            <dd className='caption-14-md text-black-10'>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
