"use client";
import ToastProvider from '@/components/ToastProvider';
import { QueryProvider } from '@/providers/QueryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider />
      <QueryProvider>
        {children}
      </QueryProvider>
    </>
  );
}
