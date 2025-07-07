'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, type Question } from '@/data/questions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MoveRight } from 'lucide-react';

type UserAnswer = {
  question: string;
  answer: string;
};

export default function QuizClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion: Question = questions[currentQuestionIndex];
  const characterLimit = 300;

  const handleNextQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTransitioning) return;

    if (currentAnswer.trim() === '') {
      toast({
        title: 'An Answer is Required',
        description: "Please type an answer or select a suggestion.",
        variant: 'destructive',
      });
      return;
    }

    const newAnswer: UserAnswer = {
      question: currentQuestion.question,
      answer: currentAnswer,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer('');
        setIsTransitioning(false);
      } else {
        try {
          localStorage.setItem(
            'quizResults',
            JSON.stringify({
              answers: updatedAnswers,
            })
          );
        } catch (error) {
          console.error('Could not save to localStorage', error);
        }
        router.push(`/results`);
      }
    }, 300);
  };

  const handleSuggestionClick = (text: string) => {
    setCurrentAnswer(text);
  };

  return (
    <Card
      key={currentQuestionIndex}
      className="w-full max-w-2xl shadow-2xl animate-in fade-in duration-500"
    >
      <form onSubmit={handleNextQuestion}>
        <CardHeader>
          <Progress value={progress} className="w-full mb-4" />
          <CardTitle className="font-headline text-2xl md:text-3xl">
            Question {currentQuestionIndex + 1}
          </CardTitle>
          <CardDescription className="text-lg min-h-[6rem] md:min-h-[4rem]">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your answer here... or pick a suggestion below."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            className="min-h-[100px] text-base"
            required
            maxLength={characterLimit}
          />
          <div className="text-right text-sm text-muted-foreground mt-1">
            {currentAnswer.length} / {characterLimit}
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Too lazy to type? Pick one:</p>
            <div className="flex flex-wrap gap-2">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option.text}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-auto whitespace-normal"
                  onClick={() => handleSuggestionClick(option.text)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            {currentQuestionIndex + 1} of {questions.length}
          </p>
          <Button type="submit" disabled={isTransitioning} className="group">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
