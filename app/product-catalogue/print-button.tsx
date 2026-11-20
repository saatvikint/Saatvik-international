'use client';

import type { ReactNode } from 'react';

/** Opens the browser's print dialog, where visitors can also "Save as PDF". */
export function PrintButton({ className, children }: { className?: string; children: ReactNode }) {
  return <button type="button" className={className} onClick={() => window.print()}>{children}</button>;
}
