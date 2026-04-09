import AiCurationProviders from './provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AiCurationProviders>{children}</AiCurationProviders>;
}
