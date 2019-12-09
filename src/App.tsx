import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const App: React.FunctionComponent<{}> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
};
export default hot(App);
