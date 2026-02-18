import DetailHeader from '@/components/layout/detail/DetailHeader';
import PortfolioDetailContent from './components/portfolio-detail-content/PortfolioDetailContent';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main>
      <DetailHeader>포트폴리오 상세</DetailHeader>
      <PortfolioDetailContent id={id} />
    </main>
  );
}
