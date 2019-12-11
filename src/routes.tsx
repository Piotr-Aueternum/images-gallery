import React from 'react';
import { Route } from 'react-router';
import App from './App';
import { ListCollections } from 'modules/list-collections/ListCollections';
import { Collections } from 'modules/collections/Collections';
import { Photo } from 'modules/photo/Photo';

export const Routes = () => (
    <App>
        <Route exact path='/' component={ListCollections}/>
        <Route path='/collection/:id' component={Collections} />
        <Route path='/photo/:id' component={Photo} />
    </App>
);
