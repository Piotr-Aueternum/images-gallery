import { routerActions } from 'connected-react-router';
import * as listCollectionsActions from 'modules/list-collections/actions';
import * as collectionsActions from 'modules/collections/actions';

export default {
  collections: collectionsActions,
  listCollections: listCollectionsActions,
  router: routerActions,
};
