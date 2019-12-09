import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import {
    listCollectionsFetch,
    listCollections,
} from 'modules/list-collections/actions';
import { FetchStatus } from 'modules/list-collections/models';
import { Collections } from './components/Collections';
import { Loading } from 'components/Loading';

const Item = styled.li`
    list-style: none;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(5, 1fr);
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
    const status = useSelector(state => state.collectionsList.status);
    const collections = useSelector(state => state.collectionsList.collections);
    React.useEffect(() => {
        dispatch(listCollectionsFetch());
        axios.post('/api/list-collections', {})
            .then(response => dispatch(listCollections(response.data)));
    }, []);
    return {
        collections,
        status,
    };
};

export const ListCollections: React.FunctionComponent<{}> = () => {
    const {
        collections,
        status,
    } = useListCollections();
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
