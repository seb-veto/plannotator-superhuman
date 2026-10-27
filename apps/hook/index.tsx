import { setStorageBackend } from '@plannotator/ui/utils/storage';
import { plannotatorSuperhumanStorage } from '@plannotator/ui/utils/plannotatorSuperhumanStorage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@plannotator/editor';
import '@plannotator/editor/styles';

setStorageBackend(plannotatorSuperhumanStorage);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);