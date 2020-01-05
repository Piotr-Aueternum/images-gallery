import { useState, useEffect } from 'react';
import { Endpoints } from 'models/Endpoints';
import Axios, { Canceler } from 'axios';
import { FetchStatus } from 'models/FetchStatus';

export const useFetch = <Reply>(endpoint: Endpoints) => {
    const [status, setStatus] =
        useState(FetchStatus.Initial);

    const [data, setData] =
        useState<{ reply?: Reply }>({});

    const [cancelRequest, setCancelRequest] =
        useState<Canceler | undefined>(undefined);

    const fetch = (payload: Object): void => {
        setStatus(FetchStatus.Fetching);
        Axios.post(`/api/${endpoint}`, {
            cancelToken: new Axios.CancelToken((cancelFunction) => {
                cancelFunction();
                setCancelRequest(cancelFunction);
            }),
            request: payload,
        })
            .then(response => {
                setStatus(FetchStatus.Fetched);
                setData({ reply: response.data.reply });
            });
    };

    useEffect(() => {
        return () => {
            if (cancelRequest) {
                cancelRequest();
            }
        };
    });

    return {
        fetch,
        reply: data.reply,
        status,
    };
};
