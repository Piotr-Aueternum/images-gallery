import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
    listCollectionsFetch,
    listCollections,
} from 'modules/list-collections/actions';
import { FetchStatus } from 'models/FetchStatus';
import { Collections } from './components/Collections';
import { Loading } from 'components/Loading';
import { useFetch } from 'utilities/hooks/fetch';
import * as Types from './models';
import { RouteProps } from 'react-router';

const Item = styled.li`
    list-style: none;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(2, 1fr);
    @media (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }
    grid-template-rows: auto;
    grid-column-gap: 24px;
    grid-row-gap: 24px;
`;

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 50px 0;
`;

const useListCollections = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.listCollections.status);
    const collections = useSelector(state => state.listCollections.collections);
    const { fetch, reply } = useFetch<Types.CollectionsReply[]>('list-collections');
    React.useEffect(() => {
        if (reply) {
            dispatch(listCollections(reply));
        }
    }, [reply]);
    const wrappedFetch = (req: Object) => {
        dispatch(listCollectionsFetch());
        fetch(req);
    };
    return {
        collections,
        fetch: wrappedFetch,
        status,
    };
};

export const ListCollections: React.FunctionComponent<RouteProps> = () => {
    const {
        collections,
        status,
        fetch,
    } = useListCollections();
    React.useEffect(() => {
        fetch({ test: ''});
    }, []);
    if (status === FetchStatus.Fetching) {
        return (
            <LoaderWrapper>
                <Loading />
            </LoaderWrapper>
        );
    }
    return (
        <List>
            {collections.map(collection => (
                <Item key={collection.id}>
                    <Collections collection={collection}/>
                </Item>
            ))}
        </List>
    );
};
