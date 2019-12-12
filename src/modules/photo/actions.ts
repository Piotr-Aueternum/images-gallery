import { createAction } from 'typesafe-actions';

import { PhotoReply } from './models';

const FETCH = 'photo/PHOTO_FETCH';
const PHOTO = 'photo/PHOTO';

export const photoFetch = createAction(FETCH)();

export const photo =
  createAction(PHOTO)<PhotoReply>();
