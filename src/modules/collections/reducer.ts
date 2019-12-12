import { combineReducers } from 'redux';
import * as R from 'ramda';
import { ActionType, getType } from 'typesafe-actions';

import { Photo, PhotoReply } from './models';
import { FetchStatus } from 'models/FetchStatus';
import * as actions from './actions';
import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router';

export type CollectionsState = {
    readonly photos: readonly Photo[];
    readonly status: FetchStatus;
};

export type CollectionsAction
    = ActionType<typeof actions>
    | LocationChangeAction
    ;

const getPhotoThumb = (photo: PhotoReply): string =>
    R.pathOr('', [
        'urls',
        'thumb',
    ], photo);

const initialPhotos: Photo[] = [];

export default combineReducers<CollectionsState, CollectionsAction>({
    photos: (state = initialPhotos, action) => {
        switch (action.type) {
            case getType(actions.collections): {
                return state.concat(
                    R.map(
                        photo => ({
                            alt: photo.alt_description,
                            id: photo.id,
                            photo: getPhotoThumb(photo),
                        }),
                        action.payload,
                    ),
                );
            }
            case LOCATION_CHANGE: {
                if (action.payload.location.pathname === '/') {
                    return initialPhotos;
                }
                return state;
            }
            default: {
                return state;
            }
        }
    },
    status: (state = FetchStatus.Initial, action) => {
        switch (action.type) {
            case getType(actions.collectionsFetch): {
                return FetchStatus.Fetching;
            }
            case getType(actions.collections): {
                return FetchStatus.Fetched;
            }
            default: {
                return state;
            }
        }
    },
});
