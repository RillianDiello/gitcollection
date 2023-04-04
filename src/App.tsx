import React from 'react';
import { BrowserRouter  } from 'react-router-dom';
import { MainRoutes } from './routes';
import { GlobalStyle } from './styles/global';
const App: React.FC = ()  => {
  return (
    <>
    <BrowserRouter>
        <MainRoutes />
    </BrowserRouter>
    <GlobalStyle />
   </>
  );
};

export default App;
