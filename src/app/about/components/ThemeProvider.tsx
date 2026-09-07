'use client';

import * as React from 'react';

/**
 * No-op ThemeProvider pass-through.
 * Theme switching has been removed in favor of a fixed dark terminal aesthetic.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
