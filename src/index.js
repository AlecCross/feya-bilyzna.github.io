import React, { Suspense } from 'react'
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals'
import "materialize-css"
import { ApolloClient, ApolloProvider, InMemoryCache, } from "@apollo/client"
import { concatPagination } from '@apollo/client/utilities'
import './i18n'
import { hydrate, render } from "react-dom"

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                categoryProducts: concatPagination(['categoryName']),
            },
        },
    },
})

const client = new ApolloClient({
    uri: process.env.REACT_APP_APOLLO_CLIENT_URI,
    cache: cache,
})



const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<React.StrictMode>
        <ApolloProvider client={client}>
            <Suspense fallback={null}>
                <App />
            </Suspense>
        </ApolloProvider>
    </React.StrictMode>, rootElement);
} else {
    render(<React.StrictMode>
        <ApolloProvider client={client}>
            <Suspense fallback={null}>
                <App />
            </Suspense>
        </ApolloProvider>
    </React.StrictMode>, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
