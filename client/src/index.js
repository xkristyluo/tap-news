import App from './App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// render the App component on root
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
