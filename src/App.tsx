import type { ReactNode } from 'react';
import './global.scss';

type AppProps = {
  children: ReactNode;
};

const App = ({ children }: AppProps) => {
  return (
    <div className='root'>
      <div className='app'>{children}</div>
    </div>
  );
};

export default App;
