import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    listCollectionsFetch,
    listCollections,
} from 'modules/list-collections/actions';
import axios from 'axios';
import { FetchStatus } from 'modules/list-collections/models';

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
        return <div>Loading</div>;
    }
    return <>
        <ul>
            {collections.map(collection => (
                <li key={collection.id}>
                    {collection.title}
                </li>
            ))}
        </ul>
    </>;
};
