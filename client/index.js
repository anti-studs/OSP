import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App.jsx';
import { QueryProvider } from './components/Query.jsx';

// import { QueryProvider, requests } from './components/Query.jsx';

// import styles from './stylesheets/application.scss';

const container = document.getElementById('app');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
    <QueryProvider>
        <App />
    </QueryProvider>
);

