import AuthContext from '@/context/AuthContext';
import Header from '../components/Header';
import './globals.css';
import { Noto_Sans } from 'next/font/google';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';

const sans = Noto_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata: Metadata = {
  title: {
    default: 'Outstagram',
    template: 'Outstagram | %s',
  },
  description: 'Outstagram Posts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.className}>
      <body className="w-full overflow-auto bg-neutral-50">
        <AuthContext>
          <Header />
          <main className="flex justify-center w-full max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal"></div>
      </body>
    </html>
  );
}
