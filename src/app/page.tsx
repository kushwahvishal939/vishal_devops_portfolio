'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/homepage');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-center">
        Redirecting to homepage. If you are not redirected,{' '}
        <a href="/homepage" className="text-accent underline">
          click here
        </a>
        .
      </p>
    </div>
  );
}
