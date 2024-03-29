import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </React.StrictMode>,
);
