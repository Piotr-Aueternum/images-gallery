import { useState } from 'react';
import { Endpoints } from 'models/Endpoints';
import Axios from 'axios';
import { FetchStatus } from 'models/FetchStatus';

export const useFetch = <Reply>(endpoint: Endpoints) => {
    const [status, setStatus] = useState(FetchStatus.Initial);
    const [data, setData] = useState<{ reply: Reply } | { reply: undefined }>({
            reply: undefined,
        });

    const fetch = (payload: Object): void => {
        setStatus(FetchStatus.Fetching);
        Axios.post(`/api/${endpoint}`, { request: payload })
            .then(response => {
                setStatus(FetchStatus.Fetched);
                setData({ reply: response.data.reply });
            });
    };

    return {
        fetch,
        reply: data.reply,
        status,
    };
};
