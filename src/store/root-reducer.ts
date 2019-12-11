import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import listCollectionsReducer from 'modules/list-collections/reducer';
import collectionsReducer from 'modules/collections/reducer';

const rootReducer = (history: History) => combineReducers({
  collections: collectionsReducer,
  listCollections: listCollectionsReducer,
  router: connectRouter(history),
});

export default rootReducer;
