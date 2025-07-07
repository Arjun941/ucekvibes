import QuizClient from '@/components/quiz/QuizClient';

export default function QuizPage() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center p-4 sm:p-8 bg-background transition-colors duration-500">
      <QuizClient />
    </main>
  );
}
