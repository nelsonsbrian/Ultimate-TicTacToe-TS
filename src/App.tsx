import React from 'react';
import { Provider } from 'react-redux';
import GlobalBoard from './components/GlobalBoard';
import Header from './components/Header';
import Status from './components/Status';
import { store } from './store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Status />
        <GlobalBoard />
      </Provider>
    </div>
  );
}

export default App;
