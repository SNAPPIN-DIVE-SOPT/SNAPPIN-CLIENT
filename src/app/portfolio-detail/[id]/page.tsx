import PageClient from './page.client';

type PortfolioDetail = {
  params: {
    id: string;
  }
}

export default function PortfolioDetail({ params }: PortfolioDetail) {
  return <PageClient params={params} />;
}
