import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/lotties/loading.json';
import { cn } from '../../lib/cn';

type LoadingProps = {
  className?: string;
};

export default function Loading({ className }: LoadingProps) {
  return <Lottie animationData={loadingAnimation} className={cn('h-[7rem] w-[7rem]', className)} />;
}
