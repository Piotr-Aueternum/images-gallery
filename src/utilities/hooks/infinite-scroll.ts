import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { FetchStatus } from 'models/FetchStatus';

const getScrollBottom = ({
    scrollHeight,
    scrollTop,
    clientHeight,
}: HTMLElement): number => {
    return scrollHeight - (scrollTop + clientHeight);
};

interface InfiniteScroll {
    callback?: () => Promise<any>;
    offset: number;
    status?: FetchStatus;
}

export const useInfiniteScroll = ({
    callback,
    offset = 100,
    status,
}: InfiniteScroll) => {
    const scroller = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    const handleScroll = () => {
        if (scroller.current) {
            const scrollerElement = scroller.current;
            if (getScrollBottom(scrollerElement) < offset && !loading) {
                setLoading(true);
                if (callback) {
                    callback().then(() => setLoading(false));
                }
            }
        }
    };

    useEffect(() => {
        if (status === FetchStatus.Fetched) {
            setLoading(false);
        }
    }, [status]);

    useLayoutEffect(() => {
        handleScroll();
    }, [scroller.current]);

    return {
        handleScroll,
        loading,
        scrollerRef: scroller,
    };
};
