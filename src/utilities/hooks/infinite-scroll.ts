import { useRef, useState, useEffect } from 'react';
import { FetchStatus } from 'models/FetchStatus';

const getScrollBottom = ({
    scrollHeight,
    scrollTop,
    clientHeight,
}: HTMLElement): number => {
    return scrollHeight - (scrollTop + clientHeight);
};

interface InfiniteScroll {
    handleScroll: () => Promise<any> | void;
    offset?: number;
    status?: FetchStatus;
}

export const useInfiniteScroll = ({
    handleScroll,
    offset = 100,
    status,
}: InfiniteScroll) => {
    const scroller = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    const onScroll = () => {
        if (scroller.current) {
            const scrollerElement = scroller.current;
            if (getScrollBottom(scrollerElement) < offset && !loading) {
                setLoading(true);
                const maybePromise = handleScroll();
                if (maybePromise instanceof Promise) {
                    maybePromise.then(() => setLoading(false));
                }
            }
        }
    };

    useEffect(() => {
        if (status === FetchStatus.Fetched) {
            setLoading(false);
        }
    }, [status]);

    useEffect(() => {
        onScroll();
    }, [scroller.current]);

    return {
        loading,
        onScroll,
        scrollerRef: scroller,
    };
};
