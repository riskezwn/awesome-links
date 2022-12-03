import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';

interface Props {
  children: ReactNode | ReactNode[]
}

function Layout({ children }: Props) {
  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
