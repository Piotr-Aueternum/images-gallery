import React from 'react';
import { Route } from 'react-router';
import App from './App';
import { ListCollections } from 'modules/list-collections/ListCollections';
import { Collections } from 'modules/collections/Collections';
import { Photo } from 'modules/photo/Photo';
import { Container } from 'components/Container';

export const Routes = () => (
    <App>
        <Route
            exact
            path='/'
            render={(props) => (
                <Container>
                    <ListCollections {...props} />
                </Container>
            )}
        />
        <Route path='/collection/:id' component={Collections} />
        <Route
            path='/photo/:id'
            render={(props) => (
                <Container>
                    <Photo {...props} />
                </Container>
            )}
        />
    </App>
);
