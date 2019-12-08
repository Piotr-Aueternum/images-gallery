import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import collectionsListReducer from 'modules/list-collections/reducer';

const rootReducer = (history: History) => combineReducers({
  collectionsList: collectionsListReducer,
  router: connectRouter(history),
});

export default rootReducer;
