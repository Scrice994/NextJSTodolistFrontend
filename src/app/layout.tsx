import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import AuthModalsProvider from '@/context/AuthModalsProvider';
import TodolistModalsProvider from '@/context/TodolistModalsProvider';
import StoreProvider from './StoreProvider';
import Header from '@/components/header/Header';

const inter = Raleway({ subsets: ['latin'], weight: ["100", "300", "400", "500", "700", "900"] })

export const metadata: Metadata = {
  title: "My To Do List",
  description: "My personal app to show my skills",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthModalsProvider>
                <TodolistModalsProvider>
                  <Header />
                  <main>
                      {children}
                  </main>
              </TodolistModalsProvider>
          </AuthModalsProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
