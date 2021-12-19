import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ListOfIssues from "./components/List";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { ErrorLink, onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import Issue from "./components/Issue";

interface Chunk {
  issues: [
    {
      node: {
        title: string;
      };
    }
  ];
}

const App: React.FC = () => {
  const [issues, setIssues] = useState<any>([]);
  const [page, setPage] = useState<number>(0);

  const [owner, setOwner] = useState<string>("facebook");
  const [name, setName] = useState<string>("react");
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const link = from([
    errorLink,
    new HttpLink({ uri: "https://api.github.com/graphql" }),
  ]);

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "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";
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });

  return (
    <div className="App">
      <NavLink to={`/issues/${page + 1}`}>
        <button onClick={() => setPage(page + 1)}>More</button>
      </NavLink>
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={
              <SearchBar
                issues={issues}
                setIssues={setIssues}
                page={page}
                owner={owner}
                setOwner={setOwner}
                name={name}
                setName={setName}
              />
            }
          />

          <Route
            path={`/issues/:site`}
            element={
              <ListOfIssues
                issues={issues}
                page={page}
                setPage={setPage}
                key={Date.now()}
              />
            }
          />
          <Route
            path={`/issues/:site/:singeIssue`}
            element={<Issue issues={issues} />}
          />
        </Routes>
      </ApolloProvider>
    </div>
  );
};

export default App;
