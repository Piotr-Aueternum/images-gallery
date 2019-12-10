import React from 'react';
import { useFetch } from 'utilities/hooks/fetch';
import { FetchStatus } from 'models/FetchStatus';

export const Collections = () => {
    const { fetch, reply, status } = useFetch('collections');
    React.useEffect(() => {
        fetch({});
    }, []);
    if (status === FetchStatus.Fetching) {
        return <h1>Ładowanie</h1>;
    }
    if (reply) {
        return reply.map((collection: any) => <div>
            <img src={collection.urls.thumb} />
        </div>);
    }
    return <div>test </div>;
};
