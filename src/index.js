import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import RootReducer from './redux/reducer'
import './index.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

//variable redux
const crStore = createStore(RootReducer)

ReactDOM.render(<Provider store={crStore}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
