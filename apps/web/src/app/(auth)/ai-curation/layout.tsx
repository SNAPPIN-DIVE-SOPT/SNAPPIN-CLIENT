import AiCurationProviderBridge from './provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AiCurationProviderBridge>{children}</AiCurationProviderBridge>;
}
