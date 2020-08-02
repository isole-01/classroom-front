import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router} from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";


import App from "./App";

import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
}


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions:defaultOptions,
});


let hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </Router>,
    document.getElementById("root")
);

