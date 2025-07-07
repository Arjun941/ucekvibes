'use client';

import { useState, useEffect, useRef, forwardRef, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  analyzePersonality,
  type AnalyzePersonalityInput,
} from '@/ai/flows/analyze-personality';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, ChevronsLeft, Share2 } from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';
import html2canvas from 'html2canvas';

function SurvivalFailure({
  score,
  onRetry,
}: {
  score: number;
  onRetry: () => void;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
      <Card className="w-full max-w-2xl p-6 shadow-xl bg-destructive/20 border-destructive">
        <CardHeader>
          <CardTitle className="font-headline text-4xl text-destructive">
            Vibe Check Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-destructive-foreground/80">
            Your UCEK Compatibility Score is:
          </p>
          <p className="text-8xl font-bold text-destructive my-4">{score}%</p>
          <p className="text-2xl font-headline font-bold">
            You Might Not Survive Here
          </p>
          <p className="text-lg italic text-muted-foreground mt-2">
            "The UCEK spirit is strong, but your connection seems to be on 2G.
            Better luck next time!"
          </p>
        </CardContent>
      </Card>

      <p className="text-center mt-8 mb-4 text-xs text-muted-foreground px-4">
        Disclaimer: This quiz is a fun, sarcastic experiment and isn't meant to
        be taken seriously. It's all about the UCEK vibe!
      </p>

      <Button variant="outline" className="mt-2" onClick={onRetry}>
        <ChevronsLeft className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}

// Certificate Component
interface CertificateProps {
  name: string;
  score: number;
  title: string;
  quote: string;
  date: string;
}

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ name, score, title, quote, date }, ref) => {
    const nameTextRef = useRef<SVGTextElement>(null);
    const [nameWidth, setNameWidth] = useState(0);

    useLayoutEffect(() => {
      if (nameTextRef.current) {
        setNameWidth(nameTextRef.current.getBBox().width);
      }
    }, [name]);

    const wrapText = (text: string, maxCharsPerLine: number): string[] => {
      const words = text.split(' ');
      const lines: string[] = [];
      if (!words.length) return [];

      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        if ((currentLine + ' ' + words[i]).length > maxCharsPerLine) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine += ' ' + words[i];
        }
      }
      lines.push(currentLine);
      
      if (lines.length > 3) {
        const truncated = lines.slice(0, 2);
        let lastLine = lines[2];
        // Ensure the last line doesn't exceed the char limit before adding ellipsis
        if (lastLine.length > maxCharsPerLine - 3) {
            lastLine = lastLine.slice(0, maxCharsPerLine - 3);
        }
        // Trim trailing space before ellipsis
        lastLine = lastLine.trim() + '...';
        truncated.push(lastLine);
        return truncated.slice(0, 3);
      }
      return lines;
    };
    
    // Increased max characters per line to better use horizontal space
    let quoteLines = wrapText(`"${quote}"`, 70);

    const displayName = name || 'The Unnamed Legend';

    const yPos = {
      // These values are fine-tuned for vertical balance.
      certTitle: 131,
      certifiesThat: 171,
      name: 221,
      underline: 236,
      scoreText1: 266,
      score: 344,
      scoreText2: 381,
      title: 421,
      quote: 460,
      date: 526,
    };

    return (
      <div ref={ref}>
        <svg
          width="800"
          height="565"
          viewBox="0 0 800 565"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <style>
            {`
            .headline-font { font-family: 'Space Grotesk', sans-serif; }
            .body-font { font-family: 'Inter', sans-serif; }
            .bg-rect { fill: hsl(var(--background)); }
            .fg-color { fill: hsl(var(--foreground)); }
            .primary-color { fill: hsl(var(--primary)); }
            .accent-color { fill: hsl(var(--accent)); }
            .muted-color { fill: hsl(var(--muted-foreground)); }
            .primary-stroke { stroke: hsl(var(--primary)); }
            .accent-stroke { stroke: hsl(var(--accent)); }
          `}
          </style>

          <rect width="100%" height="100%" className="bg-rect" />

          <rect
            x="4"
            y="4"
            width="792"
            height="557"
            rx="8"
            fill="none"
            className="primary-stroke"
            strokeWidth="4"
          />
          <rect
            x="14"
            y="14"
            width="772"
            height="537"
            rx="4"
            fill="none"
            className="primary-stroke"
            strokeWidth="1"
            strokeDasharray="5, 5"
            strokeOpacity="0.7"
          />

          <g transform="translate(0, -8)">
            <g transform="translate(398, 96)">
              <g transform="translate(-132, -1.5)">
                <svg
                  x="0"
                  y="-15.5"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
                <text
                  x="40"
                  y="0"
                  fontSize="30"
                  fontWeight="bold"
                  className="headline-font fg-color"
                  textAnchor="start"
                  dominantBaseline="middle"
                >
                  UCEK Vibe Check
                </text>
              </g>
            </g>
            <g textAnchor="middle">
              <text
                x="400"
                y={yPos.certTitle}
                fontSize="20"
                className="body-font fg-color"
              >
                Certificate of Compatibility
              </text>
              <text
                x="400"
                y={yPos.certifiesThat}
                fontSize="18"
                className="body-font fg-color"
              >
                This certifies that
              </text>

              <text
                ref={nameTextRef}
                x="400"
                y={yPos.name}
                fontSize="48"
                fontWeight="bold"
                className="headline-font primary-color"
              >
                {displayName}
              </text>

              {nameWidth > 0 && (
                <line
                  x1={400 - nameWidth / 2 - 10}
                  y1={yPos.underline}
                  x2={400 + nameWidth / 2 + 10}
                  y2={yPos.underline}
                  className="accent-stroke"
                  strokeWidth="3"
                />
              )}

              <text
                x="400"
                y={yPos.scoreText1}
                fontSize="18"
                className="body-font fg-color"
              >
                has achieved a UCEK compatibility score of
              </text>
              <text
                x="400"
                y={yPos.score}
                fontSize="80"
                fontWeight="bold"
                className="accent-color headline-font"
              >
                {score}%
              </text>
              <text
                x="400"
                y={yPos.scoreText2}
                fontSize="18"
                className="body-font fg-color"
              >
                and is hereby bestowed the title of
              </text>
              <text
                x="400"
                y={yPos.title}
                fontSize="32"
                fontWeight="bold"
                className="headline-font primary-color"
              >
                {title}
              </text>
              <text
                y={yPos.quote}
                fontSize="17"
                className="muted-color body-font"
                fontStyle="italic"
              >
                {quoteLines.map((line, index) => (
                  <tspan x="400" dy={index === 0 ? 0 : '1.4em'} key={index}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text
                x="400"
                y={yPos.date}
                fontSize="14"
                className="body-font muted-color"
              >
                Issued on {date || '...'}
              </text>
            </g>
          </g>
        </svg>
      </div>
    );
  }
);
Certificate.displayName = 'Certificate';

export default function ResultsClient() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [result, setResult] = useState<{
    score: number;
    title: string;
    quote: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const certificateRef = useRef<HTMLDivElement>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    setCurrentDate(new Date().toLocaleDateString());

    const resultsData = localStorage.getItem('quizResults');

    if (!resultsData) {
      router.replace('/');
      return;
    }

    let parsedData: { answers: AnalyzePersonalityInput['answers'] };
    try {
      parsedData = JSON.parse(resultsData);
    } catch (error) {
      console.error('Failed to parse quiz results from localStorage', error);
      toast({
        title: 'Error',
        description:
          'Could not read your results. Please try the quiz again.',
        variant: 'destructive',
      });
      router.replace('/');
      return;
    }

    if (!parsedData || !parsedData.answers) {
      console.error('Parsed quiz results are invalid.', parsedData);
      toast({
        title: 'Error',
        description:
          'Your quiz results seem to be corrupted. Please try the quiz again.',
        variant: 'destructive',
      });
      router.replace('/');
      return;
    }

    const { answers } = parsedData;

    const fetchPersonality = async () => {
      try {
        const personality = await analyzePersonality({ answers });
        setResult(personality);
      } catch (error) {
        console.error('AI analysis failed:', error);
        toast({
          title: 'AI Analysis Failed',
          description:
            'We had trouble generating your custom vibe. Using a fallback!',
          variant: 'destructive',
        });
        setResult({
          score: 60,
          title: 'Certified Survivor',
          quote: "You've adapted and overcome. That's the real test.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPersonality();
  }, [router, toast]);

  const getCertificateImageBlob = async (): Promise<Blob | null> => {
    const svgContainer = certificateRef.current;
    if (!svgContainer) return null;

    const svgElement = svgContainer.querySelector('svg');
    if (!svgElement) return null;

    const style = getComputedStyle(document.body);
    const background = style.getPropertyValue('--background').trim();
    const foreground = style.getPropertyValue('--foreground').trim();
    const primary = style.getPropertyValue('--primary').trim();
    const accent = style.getPropertyValue('--accent').trim();
    const mutedForeground = style.getPropertyValue('--muted-foreground').trim();
    const primaryStroke = style.getPropertyValue('--primary').trim();
    const accentStroke = style.getPropertyValue('--accent').trim();

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .headline-font { font-family: 'Space Grotesk', sans-serif; }
      .body-font { font-family: 'Inter', sans-serif; }
      .bg-rect { fill: hsl(${background}); }
      .fg-color { fill: hsl(${foreground}); }
      .primary-color { fill: hsl(${primary}); }
      .accent-color { fill: hsl(${accent}); }
      .muted-color { fill: hsl(${mutedForeground}); }
      .primary-stroke { stroke: hsl(${primaryStroke}); }
      .accent-stroke { stroke: hsl(${accentStroke}); }
    `;
    svgElement.appendChild(styleEl);

    try {
        const canvas = await html2canvas(svgContainer, {
            scale: 1,
            width: 800,
            height: 565,
            backgroundColor: null,
        });

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
    } catch (err) {
        console.error('Failed to generate certificate image:', err);
        toast({
            title: 'Image Generation Failed',
            description: 'Could not generate the certificate image.',
            variant: 'destructive',
        });
        return null;
    } finally {
        svgElement.removeChild(styleEl);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    const blob = await getCertificateImageBlob();
    if (blob) {
        const dataUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'ucek-vibe-check-certificate.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(dataUrl);
    }
    setIsDownloading(false);
  };

  const handleShare = async () => {
    if (!navigator.share || !navigator.canShare) {
        toast({
            title: 'Sharing Not Supported',
            description: 'Your browser does not support the Web Share API.',
            variant: 'destructive',
        });
        return;
    }

    setIsSharing(true);
    const blob = await getCertificateImageBlob();
    
    if (blob) {
        const file = new File([blob], 'ucek-vibe-check-certificate.png', { type: 'image/png' });
        const shareData = {
            files: [file],
            title: 'My UCEK Vibe Check Certificate!',
            text: `I took the UCEK Vibe Check and got a ${result?.score}% compatibility score! My title: "${result?.title}". Find out your vibe!`,
        };

        if (navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Sharing failed:', error);
                    toast({
                        title: 'Sharing Failed',
                        description: 'Something went wrong while trying to share.',
                        variant: 'destructive',
                    });
                }
            }
        } else {
            toast({
                title: 'Cannot Share',
                description: 'The certificate could not be shared.',
                variant: 'destructive',
            });
        }
    }
    
    setIsSharing(false);
  };


  if (loading) {
    return <LoadingAnimation />;
  }

  if (!result) {
    return <LoadingAnimation />;
  }

  if (result.score < 50) {
    return (
      <SurvivalFailure score={result.score} onRetry={() => router.push('/')} />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <Card className="w-full text-center p-6 shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">
            Your Results Are In!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Your UCEK Compatibility Score is:
          </p>
          <p className="text-8xl font-bold text-primary my-4">{result.score}%</p>
          <p className="text-2xl font-headline font-bold">{result.title}</p>
          <p className="text-lg italic text-muted-foreground mt-2">
            &quot;{result.quote}&quot;
          </p>
        </CardContent>
      </Card>

      <Card className="w-full p-6 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">
            Get Your Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">
            Enter your name to appear on the certificate.
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="e.g. Alex Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg"
              aria-label="Your Name"
            />
             <Button onClick={handleShare} disabled={isSharing || isDownloading}>
                <Share2 className="mr-2 h-4 w-4" />
                {isSharing ? 'Sharing...' : 'Share'}
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading || isSharing}>
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            A preview of your certificate is below.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 p-2 border-2 border-dashed border-muted-foreground/50 overflow-x-auto">
        <Certificate
          ref={certificateRef}
          name={name}
          score={result.score}
          title={result.title}
          quote={result.quote}
          date={currentDate}
        />
      </div>

      <p className="text-center mt-8 mb-4 text-xs text-muted-foreground px-4">
        Disclaimer: This quiz is a fun, sarcastic experiment and isn't meant to
        be taken seriously. It's all about the UCEK vibe!
      </p>
      <Button
        variant="outline"
        className="mt-2"
        onClick={() => router.push('/')}
      >
        <ChevronsLeft className="mr-2 h-4 w-4" />
        Take Quiz Again
      </Button>
    </div>
  );
}
