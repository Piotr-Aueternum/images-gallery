import React from 'react';
import { useRouteMatch, RouteProps } from 'react-router';
import { useFetch } from 'utilities/hooks/fetch';
import { useDispatch, useSelector } from 'react-redux';
import { FacebookProvider, Like } from 'react-facebook';
import { PhotoReply } from './models';
import { FetchStatus } from 'models/FetchStatus';
import { Loading } from 'components/Loading';
import styled from 'styled-components';
import * as actions from './actions';

const LoaderWrapper = styled.div`
    padding: 100px 0;
    display: flex;
    justify-content: center;
`;

const usePhoto = () => {
    const dispatch = useDispatch();
    const { fetch, reply, status } = useFetch<PhotoReply>('photo');
    const photo = useSelector(state => state.photo.details);

    React.useEffect(() => {
        if (reply) {
            dispatch(actions.photo(reply));
        }
    }, [reply]);
    return {
        fetchPhoto: fetch,
        photo,
        status,
    };
};

export const Photo: React.FunctionComponent<RouteProps> = () => {
    const {
        fetchPhoto,
        status,
        photo,
    } = usePhoto();
    const { params } = useRouteMatch<{ id: string }>();
    React.useEffect(() => {
        fetchPhoto(params.id);
    }, []);
    if (status === FetchStatus.Fetching) {
        return (
            <LoaderWrapper>
                <Loading />
            </LoaderWrapper>
        );
    }
    return (
        <div>
            <figure style={{ margin: 0 }}>
                <img
                    style={{ width: '100%' }}
                    src={photo.photo}
                    alt={photo.alt}
                />
                <figcaption>
                    {photo.description}
                </figcaption>
            </figure>
            <hr />
            <FacebookProvider appId='images-gallery'>
                <Like target='_top' href={photo.photo} share />
            </FacebookProvider>
        </div>
    );
};
