import { CategoryButton } from '../components';

type CategoryProps = {
  isLoggedIn: boolean | null;
};

export default function Category({ isLoggedIn }: CategoryProps) {
  return (
    // TODO: 노션 url 삽입
    <section className='bg-black-1 flex flex-col py-[0.8rem]'>
      <CategoryButton label='공지사항' />
      <CategoryButton label='FAQ' />
      <CategoryButton label='고객센터' />
      {isLoggedIn === true ? <CategoryButton label='로그아웃' className='text-red-error' /> : null}
    </section>
  );
}
