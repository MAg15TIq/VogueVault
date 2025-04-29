import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - VogueVault',
  description: 'Explore our curated collection of fashion, lifestyle, beauty, and culture images.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
