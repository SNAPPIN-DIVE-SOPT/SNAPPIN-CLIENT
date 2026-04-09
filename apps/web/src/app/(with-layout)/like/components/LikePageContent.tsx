'use client';

import LikeEmpty from '../component/empty/LikeEmpty';
import type { LikeTab } from '../constants/tab';
import { useLoginToastGuard } from '@/hooks/useLoginToastGuard';
import LikeTabContents from './LikeTabContents';

type LikePageContentProps = {
  currentTab: LikeTab;
};

export default function LikePageContent({ currentTab }: LikePageContentProps) {
  const { isLoggedIn, authResolved } = useLoginToastGuard({
    message: '좋아요 기능은 로그인 후에 사용할 수 있어요.',
  });

  if (!authResolved) return null;

  return !isLoggedIn ? <LikeEmpty tab={currentTab} /> : <LikeTabContents currentTab={currentTab} />;
}
