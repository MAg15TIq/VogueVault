'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Create a client-only wrapper component
const ClientOnlyAd = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

// Export a dynamic version that only renders on the client
export default dynamic(() => Promise.resolve(ClientOnlyAd), {
  ssr: false,
});
