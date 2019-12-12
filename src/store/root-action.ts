import { routerActions } from 'connected-react-router';
import * as listCollectionsActions from 'modules/list-collections/actions';
import * as collectionsActions from 'modules/collections/actions';
import * as photoActions from 'modules/photo/actions';

export default {
  collections: collectionsActions,
  listCollections: listCollectionsActions,
  photo: photoActions,
  router: routerActions,
};
