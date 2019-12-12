import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store/index';
import { Routes } from './routes';

const store = configureStore()

const renderApp = () =>
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./routes', renderApp)
}

renderApp()