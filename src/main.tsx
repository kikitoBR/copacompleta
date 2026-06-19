import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initTracking } from './utils/tracking.ts';

// Initialize tracking scripts (Meta, Google Tag, TikTok)
initTracking();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
