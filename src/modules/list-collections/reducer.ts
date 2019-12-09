import { combineReducers } from 'redux';
import * as R from 'ramda';
import { ActionType, getType } from 'typesafe-actions';

import { Collections, FetchStatus } from './models';
import * as actions from './actions';

export type ListCollectionsState = {
  readonly collections: readonly Collections[];
  readonly status: FetchStatus;
};

export type ListCollectionsAction = ActionType<typeof actions>;

const getCoverPhotoThumb = (collection: Collections): string =>
  R.pathOr('', [
    'cover_photo',
    'urls',
    'thumb',
  ], collection);

export default combineReducers<ListCollectionsState, ListCollectionsAction>({
  collections: (state = [], action) => {
    if (action.type === getType(actions.listCollections)) {
      return R.map(
        collection => ({
          coverPhoto: getCoverPhotoThumb(collection),
          id: collection.id,
          title: collection.title,
        }),
        action.payload);
    }
    return state;
  },
  status: (state = FetchStatus.Initial, action) => {
    switch (action.type) {
      case getType(actions.listCollectionsFetch):
        return FetchStatus.Fetching;
      case getType(actions.listCollections):
        return FetchStatus.Fetched;
      default:
        return state;
    }
  },
});
