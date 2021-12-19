import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { SEARCH_REPO_AND_ISSUES_OPEN } from "../GraphQL/Queries";

interface Props {
  issues: [
    {
      node: {
        title: string;
      };
    }
  ];
  setIssues: Function;
  page: number;

  owner: string;
  setOwner: Function;
  name: string;
  setName: Function;
}

const SearchBar: React.FC<Props> = ({
  issues,
  setIssues,
  page,

  owner,
  setOwner,
  name,
  setName,
}) => {
  const navigate = useNavigate();
  let [counter, setCounter] = useState<String | null>(null);
  const { error, loading, data } = useQuery(SEARCH_REPO_AND_ISSUES_OPEN, {
    variables: { owner: owner, name: name, after: counter },
  });
  const findRepo = () => {
    if (data) {
      console.log("This is data: ", data);
      let newIssues: [Object] = data.repository.issues.edges.map(
        (issue: Object) => issue
      );
      setIssues([...issues, newIssues]);

      if (data.repository.issues.pageInfo.endCursor !== counter)
        setCounter(data.repository.issues.pageInfo.endCursor);
    }
    console.log("This is react: ", issues);
  };
  /*
  useEffect(() => {
    if (data) {
      let newIssues: [Object] = data.repository.issues.edges.map(
        (issue: Object) => issue
      );
      setIssues([...issues, newIssues]);

      if (data.repository.issues.pageInfo.endCursor !== counter)
        setCounter(data.repository.issues.pageInfo.endCursor);
    }
    console.log("This is react: ", issues);
  }, [data, counter]);
  */

  useEffect(() => findRepo(), [data, issues]);

  return (
    <div>
      <label>
        Owner
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </label>
      <br />
      <label>
        Repository
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button
        onClick={() => {
          findRepo();
          if (issues.length) navigate(`/issues/${page}`);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
