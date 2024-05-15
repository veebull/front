import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.tsx';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import eruda from 'eruda'
// in prod place file to static folder inside project
let manifestUrl: string
if(process.env.NODE_ENV !== 'production') {
  manifestUrl =
    'https://raw.githubusercontent.com/veebull/twa-manifest-json/main/tonconnect-manifest.json';
  eruda.init();
} else {
  manifestUrl = "/tonconnect-manifest.json"
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <React.StrictMode>
      <CssBaseline />
      <HashRouter>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </HashRouter>
    </React.StrictMode>
  </TonConnectUIProvider>,
);
