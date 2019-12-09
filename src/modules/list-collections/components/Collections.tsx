import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';
import * as types from '../models';

const CoverPhoto = styled.img`
    object-fit: cover;
`;

const CoverTitle = styled.div`
    background: rgba(255,255,255,0.7);
    color: rgb(20, 20, 20);
    font-size: 18px;
`;

const Wrapper = styled(Link)`
    position: relative;
    text-decoration: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    ${CoverPhoto} {
        height: 100%;
    }
    ${CoverTitle} {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 10px 10px;
    }
`;

interface Props {
    collection: types.Collections;
}

export const Collections: React.FunctionComponent<Props> = (props) => {
    return (
        <Wrapper to={`/collection/${props.collection.id}`}>
            <CoverPhoto src={props.collection.coverPhoto} />
            <CoverTitle>
                {props.collection.title}
            </CoverTitle>
        </Wrapper>
    );
};
