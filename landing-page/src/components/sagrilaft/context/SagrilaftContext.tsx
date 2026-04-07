import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { SagrilaftPage, Riesgo } from '../data/types';

interface SagrilaftContextType {
  currentPage: SagrilaftPage;
  selectedRiesgo: Riesgo | null;
  setCurrentPage: (page: SagrilaftPage) => void;
  setSelectedRiesgo: (riesgo: Riesgo | null) => void;
  navigateToControlesRiesgo: (riesgo: Riesgo) => void;
  navigateToRiesgos: () => void;
}

const SagrilaftContext = createContext<SagrilaftContextType | undefined>(undefined);

export function SagrilaftProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<SagrilaftPage>('home');
  const [selectedRiesgo, setSelectedRiesgo] = useState<Riesgo | null>(null);

  const navigateToControlesRiesgo = (riesgo: Riesgo) => {
    setSelectedRiesgo(riesgo);
    setCurrentPage('riesgos-controles');
  };

  const navigateToRiesgos = () => {
    setSelectedRiesgo(null);
    setCurrentPage('riesgos-list');
  };

  const value: SagrilaftContextType = {
    currentPage,
    selectedRiesgo,
    setCurrentPage,
    setSelectedRiesgo,
    navigateToControlesRiesgo,
    navigateToRiesgos,
  };

  return (
    <SagrilaftContext.Provider value={value}>
      {children}
    </SagrilaftContext.Provider>
  );
}

export function useSagrilaft() {
  const context = useContext(SagrilaftContext);
  if (!context) {
    throw new Error('useSagrilaft must be used within SagrilaftProvider');
  }
  return context;
}
