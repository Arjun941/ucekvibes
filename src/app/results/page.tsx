import ResultsClient from '@/components/results/ResultsClient';
import LoadingAnimation from '@/components/results/LoadingAnimation';
import { Suspense } from 'react';

export default function ResultsPage() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <Suspense fallback={<LoadingAnimation />}>
        <ResultsClient />
      </Suspense>
    </main>
  );
}
