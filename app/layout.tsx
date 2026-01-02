import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TrueSpace - Educational Video Platform',
  description: 'Modern educational platform with premium video courses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

