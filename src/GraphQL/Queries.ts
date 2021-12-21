import { gql } from "@apollo/client";

export const SEARCH_REPO_AND_ISSUES = gql`
  query fetchRepo($owner: String!, $name: String!, $after: String) {
    repository(owner: $owner, name: $name) {
      issues(first: 50, after: $after) {
        edges {
          node {
            title
            url
            body
            state
            comments(first: 20) {
              edges {
                node {
                  bodyText
                }
              }
            }
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;
/*
export const LOAD_FACEBOOK_REACT_CLOSED = gql`
  query {
    repository(owner: "facebook", name: "react") {
      issues(last: 100, filterBy: { states: [CLOSED] }) {
        edges {
          node {
            title
            url
            body
            state
            comments(first: 20) {
              edges {
                node {
                  bodyText
                }
              }
            }
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const LOAD_OPEN_ISSUE = gql`
  query {
    repository(owner: "facebook", name: "react") {
      issues(last: 100, filterBy: { states: [OPEN] }) {
        edges {
          node {
            title
            url
            body
            state
            comments(first: 20) {
              edges {
                node {
                  bodyText
                }
              }
            }
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
*/
