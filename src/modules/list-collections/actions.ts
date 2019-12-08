import { createAction } from 'typesafe-actions';

import { Collections } from './models';

const FETCH = 'list-collections/LIST_COLLECTIONS_FETCH';
const LIST_COLLECTIONS = 'list-collections/LIST_COLLECTIONS';

export const listCollectionsFetch = createAction(FETCH)();

export const listCollections =
  createAction(LIST_COLLECTIONS)<readonly Collections[]>();
