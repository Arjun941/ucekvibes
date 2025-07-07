import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full shrink-0 border-t border-border/50 py-3 px-4 text-xs text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row">
        <span>
          Made by{' '}
          <Link
            href="https://bento.me/arjunoff"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline"
          >
            OffSpace
          </Link>
          .
        </span>
        <div className="flex items-center gap-x-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-1 text-xs"
          >
            <Link
              href="https://bento.me/arjunoff"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LayoutGrid className="mr-1.5 h-3 w-3" />
              Bento
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-1 text-xs"
          >
            <Link
              href="https://coff.ee/offspaced"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Coffee className="mr-1.5 h-3 w-3" />
              Buy me a coffee
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
