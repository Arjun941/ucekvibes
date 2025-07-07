'use client';

import { useEffect, useState } from 'react';

const loadingTexts = [
  "Analyzing your vibe...",
  "Consulting the UCEK elders...",
  "Calculating your chaos coefficient...",
  "Checking if you're a 'Notepad' or 'VS Code' person...",
  "Determining your canteen compatibility...",
  "Running your answers through the mainframe (it's a Raspberry Pi)...",
  "Just a moment, the AI is arguing with itself..."
];

export default function LoadingAnimation() {
  const [text, setText] = useState(loadingTexts[0]);

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (isMounted) {
        setText(prevText => {
          const currentIndex = loadingTexts.indexOf(prevText);
          const nextIndex = (currentIndex + 1) % loadingTexts.length;
          return loadingTexts[nextIndex];
        });
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-6"></div>
      <h2 className="text-2xl font-headline font-bold text-primary mb-2">
        Generating Your Vibe...
      </h2>
      <p className="text-lg text-muted-foreground w-full max-w-md">{text}</p>
    </div>
  );
}
