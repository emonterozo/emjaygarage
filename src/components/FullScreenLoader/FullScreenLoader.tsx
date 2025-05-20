'use client';

import dynamic from 'next/dynamic';
const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false });
import loadingAnimation from '@/lottie/loading.json';

export default function FullScreenLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(200, 200, 200, 0.39)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <DynamicLottie animationData={loadingAnimation} loop autoplay />
    </div>
  );
}
