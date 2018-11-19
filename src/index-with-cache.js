// This file is not currently being used. It is in place of index.js if you want to use caching

import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache, gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id,
});

persistCache({
  cache,
  storage: localStorage,
});

if (localStorage['apollo-cache-persist']) {
  let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
  cache.restore(cacheData);
}

const client = new ApolloClient({
  link,
  cache,
  // uri: 'http://localhost:4000/graphql',
});

// const query = gql`
//   query {
//     allTrails {
//       name
//     }
//   }
// `;

// let allTrailsData;
// client.query({ query }).then(console.log);
// .then(res => (allTrailsData = res.data.allTrails));

// const AllTrails = ({ allTrails = allTrailsData }) => (
//   <div>
//     {allTrails.map(trail => (
//       <span>{trail.name}</span>
//     ))}
//   </div>
// );

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

console.log({ client });
