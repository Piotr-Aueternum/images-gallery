import { combineReducers } from 'redux';
import * as R from 'ramda';
import { ActionType, getType } from 'typesafe-actions';

import { Photo, PhotoReply } from './models';
import { FetchStatus } from 'models/FetchStatus';
import * as actions from './actions';

export type CollectionsState = {
  readonly photos: readonly Photo[];
  readonly status: FetchStatus;
};

export type CollectionsAction = ActionType<typeof actions>;

const getPhotoThumb = (photo: PhotoReply): string =>
  R.pathOr('', [
    'urls',
    'thumb',
  ], photo);

export default combineReducers<CollectionsState, CollectionsAction>({
  photos: (state = [], action) => {
    if (action.type === getType(actions.collections)) {
      return R.map(
        collection => ({
            alt: collection.alt_description,
            id: collection.id,
            photo: getPhotoThumb(collection),
        }),
        action.payload);
    }
    return state;
  },
  status: (state = FetchStatus.Initial, action) => {
    switch (action.type) {
      case getType(actions.collectionsFetch):
        return FetchStatus.Fetching;
      case getType(actions.collections):
        return FetchStatus.Fetched;
      default:
        return state;
    }
  },
});
