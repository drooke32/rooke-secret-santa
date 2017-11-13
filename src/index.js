import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './css/index.css';
import App from './components/App';


const Root = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
