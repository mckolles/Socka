import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
 
let rerenderEntireTree=()=>{
  root.render(
      <React.StrictMode>
    <App store={store} dispatch={store.dispatch.bind(store)}/>
  </React.StrictMode>
);
  }
  rerenderEntireTree()
  store.subscribe(rerenderEntireTree)

reportWebVitals();
