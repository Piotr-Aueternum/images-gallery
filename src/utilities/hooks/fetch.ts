import { useState } from 'react';
import { Endpoints } from 'models/Endpoints';
import Axios from 'axios';

export const useFetch = <Reply>(endpoint: Endpoints) => {
    const [data, setData] = useState<{ reply: Reply } | { reply: undefined }>({
            reply: undefined,
        });

    const fetch = <T>(payload: T): void => {
        Axios.post(`/api/${endpoint}`, { request: payload })
            .then(response => {
                setData({ reply: response.data.reply });
            });
    };

    return {
        fetch,
        reply: data.reply,
    };
};
