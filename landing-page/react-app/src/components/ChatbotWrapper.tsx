'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

export default function ChatbotWrapper() {
  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
}
