import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/components.css";
import { SuccessMessageContainer } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SuccessMessageContainer>
      <App />
    </SuccessMessageContainer>
  </React.StrictMode>
);

