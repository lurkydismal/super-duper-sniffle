import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import { apiGateway, isDev } from './stdvar';
import { enableInterceptors } from './interceptors';
import { log } from './stdlog';

enableInterceptors();

log.info(`Running ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'} build`);

log.debug(`API gateway: '${apiGateway}'`);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </React.StrictMode>,
);
