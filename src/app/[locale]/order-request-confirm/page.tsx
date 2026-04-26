'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useConfirmOrder } from '@/hooks/useOrders';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const apiMsg = error.response?.data?.message;
    if (apiMsg) return apiMsg;
  }
  return fallback;
}


function OrderRequestConfirmPageContent() {
  const t = useTranslations('OrderConfirm');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { mutate, isPending, isSuccess, isError, error } = useConfirmOrder();
  const calledRef = useRef(false);

  useEffect(() => {
    if (token && !calledRef.current) {
      calledRef.current = true;
      mutate({ token });
    }
  }, [token, mutate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md text-center">
        {/* No token */}
        {!token && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-16 w-16 text-red-400" />
            <h1 className="font-serif text-2xl text-white" >
              {t('invalidLink')}
            </h1>
            <p className="text-sm text-white/60">{t('invalidLinkDesc')}</p>
          </div>
        )}

        {/* Loading */}
        {token && isPending && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-16 w-16 animate-spin text-[#c8b8ab]" />
            <h1 className="font-serif text-2xl text-white" >
              {t('confirming')}
            </h1>
            <p className="text-sm text-white/60">{t('confirmingDesc')}</p>
          </div>
        )}

        {/* Success */}
        {token && isSuccess && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-16 w-16 text-green-400" />
            <h1 className="font-serif text-2xl text-white" >
              {t('successTitle')}
            </h1>
            <p className="text-sm text-white/60">{t('successDesc')}</p>
          </div>
        )}

        {/* Error */}
        {token && isError && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-16 w-16 text-red-400" />
            <h1 className="font-serif text-2xl text-white" >
              {t('errorTitle')}
            </h1>
            <p className="text-sm text-white/60">
              {getErrorMessage(error, t('errorDesc'))}
            </p>
            <button
              type="button"
              onClick={() => { calledRef.current = false; mutate({ token }); }}
              className="mt-2 cursor-pointer bg-[#c8b8ab] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#d6c7bb]"
            >
              {t('retry')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function OrderRequestConfirmPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black text-white">Loading...</div>}>
      <OrderRequestConfirmPageContent />
    </Suspense>
  );
}
