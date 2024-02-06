import Header from '@/components/header/Header';
import AuthModalsProvider from '@/context/AuthModalsProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import StoreProvider from './StoreProvider';
import './globals.css';

const inter = Raleway({ subsets: ['latin'], weight: ["100", "300", "400", "500", "700", "900"] })

export const metadata: Metadata = {
  title: "My To Do List",
  description: "My personal app to show my skills",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
            <AuthModalsProvider>
                    <Header />
                    <main>
                        {children}
                    </main>
            </AuthModalsProvider>
        </body>
      </html>
    </StoreProvider>
  )
}