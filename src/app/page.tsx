import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center p-8 bg-background">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-primary/[0.05] -z-10"></div>
      <Card className="w-full max-w-xl shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            UCEK Vibe Check
          </h1>
          <CardTitle className="text-3xl font-headline mt-4">
            Are You UCEK Enough?
          </CardTitle>
          <CardDescription className="text-lg pt-2">
            Take this not-so-scientific quiz to determine your compatibility
            with UCEK.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-center mb-6 text-muted-foreground">
            20 questions. Answer freely. Uncover your UCEK persona.
          </p>
          <p className="text-center mb-6 text-xs text-muted-foreground px-4">
            Disclaimer: This quiz is a fun, sarcastic experiment and isn't meant
            to be taken seriously. It's all about the UCEK vibe!
          </p>
          <Link href="/quiz" passHref>
            <Button size="lg" className="font-bold text-lg group">
              Take the Quiz
              <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
