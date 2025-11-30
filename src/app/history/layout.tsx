import { AppLayout } from '@/components/fridge-chef/app-layout';

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
