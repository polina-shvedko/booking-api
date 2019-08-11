//*Import REACT
import React from 'react';
import ReactDOM from 'react-dom';

//*Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

//*Import unsere CSS Styles
import './index.css';

//*Import unser Component App
import App from './App';

//*Import ServiceWorker von React, der ich nicht benutze
import * as serviceWorker from './serviceWorker';

//*React füght Component App in Element mit id="root" hin.
ReactDOM.render(<App />, document.getElementById('root'));


//* Dies Block benutze ich nicht

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
