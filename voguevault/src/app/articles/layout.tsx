import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles - VogueVault',
  description: 'Explore our collection of articles on fashion, lifestyle, beauty, and culture.',
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
