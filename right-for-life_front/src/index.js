import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import { configureStore } from './configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
