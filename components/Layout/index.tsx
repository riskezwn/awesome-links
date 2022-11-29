import { ReactNode } from 'react';
import Header from './Header';

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
