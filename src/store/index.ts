import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import rootReducer from './root-reducer';

export const history = createBrowserHistory();

const routerMiddleware = createRouterMiddleware(history);

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export default function configureAppStore(preloadedState: RootState) {
  const store = configureStore({
    middleware: [...getDefaultMiddleware(), routerMiddleware],
    preloadedState,
    reducer: rootReducer(history),
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () =>
      store.replaceReducer(rootReducer(history)));
  }

  return store;
}
