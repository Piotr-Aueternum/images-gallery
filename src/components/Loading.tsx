import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    width: 92px;
    height: 92px;
    :after {
        content: "";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid;
        border-color: rgba(0,0,0,0.6) transparent;
        animation: ${loading} 1.2s linear infinite;
    }
`;
