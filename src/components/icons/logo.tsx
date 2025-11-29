import { cn } from '@/lib/utils';
import { ChefHat } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('p-1.5 bg-primary/20 rounded-lg', className)}>
        <ChefHat className="h-5 w-5 text-primary" />
    </div>
  );
}
