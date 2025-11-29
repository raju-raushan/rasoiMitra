import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', className)}
    >
      <path d="M20 12c0-2.2-2.5-4-5-4s-5 1.8-5 4c0 1.9 1.1 3.4 3 4" />
      <path d="M14 12c0-2.2-2.5-4-5-4s-5 1.8-5 4c0 1.9 1.1 3.4 3 4" />
      <path d="M12 21a2.5 2.5 0 0 0 4-3H8a2.5 2.5 0 0 0 4 3Z" />
      <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5V6H9.5V4.5A2.5 2.5 0 0 1 12 2Z" />
      <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5V6h5V4.5A2.5 2.5 0 0 0 12 2Z" />
    </svg>
  );
}
