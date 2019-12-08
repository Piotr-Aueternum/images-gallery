import React from 'react';
import { hot } from 'react-hot-loader/root';

const App: React.FunctionComponent<{}> = ({ children }) => {
    return <>
        Header
        {children}
    </>;
};
export default hot(App);
