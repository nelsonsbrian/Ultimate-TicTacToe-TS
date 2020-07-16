import React, { ReactElement } from 'react';
import GlobalBoard from './GlobalBoard';
import Header from './Header';
import Status from './Status';

const App: React.FC = (): ReactElement => {
  return (
    <div>
      <Header />
      <Status />
      <GlobalBoard />
    </div>
  );
}

export default App;