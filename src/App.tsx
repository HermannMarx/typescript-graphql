import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ListOfIssues from "./components/List";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./GraphQL/Client";
import SingleIssue from "./components/SingleIssue";
import GraphQLHandler from "./components/GraphQLHandler";
import FilteredList from "./components/FilteredList";

const App: React.FC = () => {
  const [owner, setOwner] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [search, setSearch] = useState<Boolean>(false);
  const [repoFound, setRepoFound] = useState<Boolean>(false);

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={
              <SearchBar
                owner={owner}
                setOwner={setOwner}
                name={name}
                setName={setName}
                search={search}
                setSearch={setSearch}
                repoFound={repoFound}
              />
            }
          />

          <Route
            path={`/issues/:site`}
            element={
              <ListOfIssues setRepoFound={setRepoFound} key={Date.now()} />
            }
          />
          <Route
            path={`/issues/:site/:singleIssue`}
            element={<SingleIssue />}
          />
          <Route
            path={"/issues/filter"}
            element={<FilteredList setRepoFound={setRepoFound} />}
          />
        </Routes>
        {search && (
          <GraphQLHandler
            owner={owner}
            name={name}
            search={search}
            repoFound={repoFound}
            setRepoFound={setRepoFound}
          />
        )}
      </ApolloProvider>
    </div>
  );
};

export default App;
