'use client';

import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] p-4 font-mono">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-8xl font-bold text-[#f59e0b] opacity-20">404</span>
        </div>

        <div className="border border-[#222] bg-[#111] p-6 mb-8">
          <p className="text-[#f59e0b] text-sm mb-2">$ cd /requested-page</p>
          <p className="text-[#ef4444] text-xs mb-4">
            bash: cd: /requested-page: No such file or directory
          </p>
          <p className="text-[#666] text-xs">The page you are looking for does not exist.</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.history?.back()}
            className="px-4 py-2 border border-[#222] text-[#e0e0e0] text-xs uppercase tracking-wider hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors"
          >
            go_back
          </button>
          <button
            onClick={() => router?.push('/')}
            className="px-4 py-2 bg-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold hover:bg-[#d97706] transition-colors"
          >
            go_home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
