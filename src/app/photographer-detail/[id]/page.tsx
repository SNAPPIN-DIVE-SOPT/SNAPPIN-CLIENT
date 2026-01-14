import PageClient from './page.client';

type AuthorDetailProps = {
  params: {
    id: string;
  }
}

export default function AuthorDetail({ params }: AuthorDetailProps) {
  return <PageClient params={params} />;
}