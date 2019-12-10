import { createAction } from 'typesafe-actions';

import { PhotoReply } from './models';

const FETCH = 'collections/COLLECTIONS_FETCH';
const COLLECTIONS = 'collections/COLLECTIONS';

export const collectionsFetch = createAction(FETCH)();

export const collections =
  createAction(COLLECTIONS)<readonly PhotoReply[]>();
