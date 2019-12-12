import { combineReducers } from 'redux';
import * as R from 'ramda';
import { ActionType, getType } from 'typesafe-actions';

import { Photo, PhotoReply } from './models';
import { FetchStatus } from 'models/FetchStatus';
import * as actions from './actions';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

export type CollectionsState = {
    readonly details: Photo;
    readonly status: FetchStatus;
};

export type CollectionsAction
    = ActionType<typeof actions>
    | LocationChangeAction
    ;

const getPhoto = (photo: PhotoReply): string =>
    R.pathOr('', [
        'urls',
        'full',
    ], photo);

const initialDetails = {
    alt: '',
    color: '',
    description: '',
    photo: '',
};

export default combineReducers<CollectionsState, CollectionsAction>({
    details: (state = initialDetails, action) => {
        switch (action.type) {
            case getType(actions.photo): {
                const details = action.payload;
                return {
                    alt: details.alt_description,
                    color: details.color,
                    description: details.description,
                    photo: getPhoto(details),
                };
            }
            case LOCATION_CHANGE: {
                if (action.payload.location.pathname === '/') {
                    return initialDetails;
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
            case getType(actions.photoFetch): {
                return FetchStatus.Fetching;
            }
            case getType(actions.photo): {
                return FetchStatus.Fetched;
            }
            case LOCATION_CHANGE: {
                if (action.payload.location.pathname === '/') {
                    return FetchStatus.Initial;
                }
                return state;
            }
            default: {
                return state;
            }
        }
    },
});
