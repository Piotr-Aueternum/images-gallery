import React, { useState, useEffect } from 'react';
import { useFetch } from 'utilities/hooks/fetch';
import { useInfiniteScroll } from 'utilities/hooks/infinite-scroll';
import { Loading } from 'components/Loading';
import { PhotoReply, OrderBy } from './models';
import styled from 'styled-components';
import * as actions from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import * as R from 'ramda';

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
        grid-template-columns: repeat(4, 1fr);
    }
    grid-template-rows: auto;
    grid-column-gap: 24px;
    grid-row-gap: 24px;
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    height: 100vh;
    padding-top: 50px;
    ${List} {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
    }
`;

const PhotoImg = styled.img`
    object-fit: cover;
`;

const Photo = styled(Link)`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    padding-bottom: 100%;
    position: relative;
    height: 100%;
    ${PhotoImg} {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

const LoaderWrapper = styled.div`
    padding: 100px 0;
    display: flex;
    justify-content: center;
`;

const Form = styled.form`
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    display: flex;
    z-index: 200;
    justify-content: center;
    background: #eee;
    padding: 20px;
`;

const useCollections = () => {
    const dispatch = useDispatch();
    const { fetch, reply, status } = useFetch<PhotoReply[]>('collections');
    const photos = useSelector(state => state.collections.photos);

    React.useEffect(() => {
        if (reply) {
            dispatch(actions.collections(reply));
        }
    }, [reply]);
    return {
        fetchCollections: fetch,
        photos,
        status,
    };
};

export const Collections: React.FunctionComponent = () => {
    const {
        fetchCollections,
        photos,
        status,
    } = useCollections();
    const dispatch = useDispatch();
    const { params } = useRouteMatch<{ id: string }>();
    const orderBy = useSelector(state => state.collections.orderBy);
    const [pageNo, setPageNo] = useState(1);

    const fetchCollectionsRequest = (req: { pageNo: number }) => {
        fetchCollections({ id: params.id, orderBy, pageNo: req.pageNo });
    };

    const { onScroll, scrollerRef, loading } = useInfiniteScroll({
        handleScroll: () => {
            setPageNo(R.inc);
        },
        offset: 600,
        status,
    });

    useEffect(() => {
        setPageNo(1);
    }, [orderBy]);

    useEffect(() => {
        fetchCollectionsRequest({ pageNo: pageNo });
    }, [pageNo]);

    const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value as OrderBy;
        dispatch(actions.changeOrder(value));
    };

    return (
        <>
            <Form>
                <label>Sortuj po: </label>
                <select
                    style={{ marginLeft: 12 }}
                    name='sortBy'
                    onChange={handleSelectChange}
                    value={orderBy}
                >
                    <option value='latest'>
                        Najnowsze
                    </option>
                    <option value='popular'>
                        Popularne
                    </option>
                </select>
            </Form>
            <Wrapper ref={scrollerRef} onScroll={onScroll}>
                <List>
                    {photos && photos.map((photo) => (
                        <Item key={photo.id}>
                            <Photo to={`/photo/${photo.id}`}>
                                <PhotoImg src={photo.photo} alt={photo.alt} />
                            </Photo>
                        </Item>
                    ))}
                </List>
                {loading && (
                    <LoaderWrapper>
                        <Loading />
                    </LoaderWrapper>
                )}
            </Wrapper>
        </>
    );
};
