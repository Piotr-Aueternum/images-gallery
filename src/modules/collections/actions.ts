import { createAction } from 'typesafe-actions';

import { PhotoReply, OrderBy } from './models';

const FETCH = 'collections/COLLECTIONS_FETCH';
const COLLECTIONS = 'collections/COLLECTIONS';
const CHANGER_ORDER = 'collections/CHANGE_ORDER';

export const collectionsFetch = createAction(FETCH)();

export const collections =
  createAction(COLLECTIONS)<readonly PhotoReply[]>();

export const changeOrder = createAction(CHANGER_ORDER)<OrderBy>();
