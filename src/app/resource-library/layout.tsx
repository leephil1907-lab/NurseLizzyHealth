import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Resource Library',
  description: 'Searchable health topics, explainers, articles, and glossary resources from Nurse Lizzy Health.',
  alternates: { canonical: '/resource-library' },
};

export default function ResourceLibraryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
