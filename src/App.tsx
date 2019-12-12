import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
`;

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
`;

const App: React.FunctionComponent<{}> = ({ children }) => {
    return (
        <>
            <GlobalStyle />
            <Container>
                {children}
            </Container>
        </>
    );
};
export default hot(App);
