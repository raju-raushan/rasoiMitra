import { cn } from '@/lib/utils';
import { Square } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('p-1.5 bg-primary/20 rounded-lg', className)}>
        <Square className="h-5 w-5 text-primary" />
    </div>
  );
}