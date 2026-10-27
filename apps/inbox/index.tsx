import { setStorageBackend } from '@plannotator/ui/utils/storage';
import { plannotatorSuperhumanStorage } from '@plannotator/ui/utils/plannotatorSuperhumanStorage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { InboxApp } from '@plannotator/inbox';
import './index.css';

setStorageBackend(plannotatorSuperhumanStorage);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element to mount to');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <InboxApp />
  </React.StrictMode>,
);
