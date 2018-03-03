import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import NewsPanel from '../NewsPanel/NewsPanel';
import React from 'react';
import logo from './logo.png';

class App extends React.Component {
    // Render NewsPanel 
    render() {
      return(
        <div>
          <img className='logo' src={logo} alt='logo' />
          <div className='container'>
            <NewsPanel />
          </div>
        </div>
      );
    }
}

export default App;