import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import listCollectionsReducer from 'modules/list-collections/reducer';

const rootReducer = (history: History) => combineReducers({
  listCollections: listCollectionsReducer,
  router: connectRouter(history),
});

export default rootReducer;
