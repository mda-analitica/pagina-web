import React from 'react';
import type { ReactNode } from 'react';
import { SagrilaftSidebar } from './SagrilaftSidebar';
import { SagrilaftBreadcrumb } from './SagrilaftBreadcrumb';

interface SagrilaftLayoutProps {
  children: ReactNode;
}

export function SagrilaftLayout({ children }: SagrilaftLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <SagrilaftSidebar />

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumb header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 flex-shrink-0 shadow-sm">
          <SagrilaftBreadcrumb />
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
