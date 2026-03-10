import React from 'react';
import { SagrilaftProvider } from './context/SagrilaftContext';
import { SagrilaftLayout } from './components/layout/SagrilaftLayout';
import { PageRouter } from './components/layout/PageRouter';

export function SagrilaftApp() {
  return (
    <SagrilaftProvider>
      <SagrilaftLayout>
        <PageRouter />
      </SagrilaftLayout>
    </SagrilaftProvider>
  );
}
