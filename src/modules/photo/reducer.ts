import { combineReducers } from 'redux';
import * as R from 'ramda';
import { ActionType, getType } from 'typesafe-actions';

import { Photo, PhotoReply } from './models';
import { FetchStatus } from 'models/FetchStatus';
import * as actions from './actions';

export type CollectionsState = {
    readonly details: Photo;
    readonly status: FetchStatus;
};

export type CollectionsAction = ActionType<typeof actions>;

const getPhoto = (photo: PhotoReply): string =>
    R.pathOr('', [
        'urls',
        'regular',
    ], photo);

export default combineReducers<CollectionsState, CollectionsAction>({
    details: (state = {
        alt: '',
        color: '',
        description: '',
        photo: '',
    }, action) => {
        if (action.type === getType(actions.photo)) {
            const details = action.payload;
            return {
                alt: details.alt_description,
                color: details.color,
                description: details.description,
                photo: getPhoto(details),
            };
        }
        return state;
    },
    status: (state = FetchStatus.Initial, action) => {
        switch (action.type) {
            case getType(actions.photoFetch):
                return FetchStatus.Fetching;
            case getType(actions.photo):
                return FetchStatus.Fetched;
            default:
                return state;
        }
    },
});
