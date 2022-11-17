import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </React.StrictMode>
);
