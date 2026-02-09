import { ClientHeader } from './components';
import PageClient from './page.client';


export default function Page() {
  return (
    <div className='relative flex flex-col bg-black-3'>
      <ClientHeader />
      <PageClient />
    </div>
  );
}