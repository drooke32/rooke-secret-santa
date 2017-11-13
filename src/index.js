import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './css/index.css';
import App from './components/App';


const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
