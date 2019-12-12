import React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';


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
            {children}
        </>
    );
};
export default hot(App);
