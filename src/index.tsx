import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import App from './App';

const root = document.getElementById('root') as HTMLElement;

ReactDom.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
