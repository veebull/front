import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.tsx';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <HashRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </HashRouter>
  </React.StrictMode>,
);
