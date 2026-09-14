import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tech Lucky Wheel - Vòng Quay May Mắn iOS 18',
  description:
    'Vòng quay may mắn công nghệ đẳng cấp phong cách iOS 18 liquid glassmorphism, 10 phần quà công nghệ cao cấp.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${jakartaSans.variable} font-sans`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
