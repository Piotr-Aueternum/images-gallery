import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import listCollectionsReducer from 'modules/list-collections/reducer';
import collectionsReducer from 'modules/collections/reducer';
import photoReducer from 'modules/photo/reducer';

const rootReducer = (history: History) => combineReducers({
  collections: collectionsReducer,
  listCollections: listCollectionsReducer,
  photo: photoReducer,
  router: connectRouter(history),
});

export default rootReducer;
