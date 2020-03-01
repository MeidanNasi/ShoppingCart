import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { loadItems } from './components/actions/itemsActions';
import configureStore from './store/configureStore';

const store = configureStore();
store.dispatch(loadItems()); // when app starts, initiallizing store with all items from restapi.
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));