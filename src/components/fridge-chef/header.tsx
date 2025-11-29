import { Logo } from '@/components/icons/logo';

export function AppHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Smart Fridge AI</span>
        </div>
      </div>
    </header>
  );
}
