import { Logo } from '@/components/icons/logo';
import { SidebarTrigger } from '../ui/sidebar';

export function AppHeader() {
  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Fridge Chef</span>
        </div>
      </div>
    </header>
  );
}
