import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { SEARCH_REPO_AND_ISSUES_OPEN } from "../GraphQL/Queries";
import { useDispatch } from "react-redux";
import { Actions } from "../reducers";

interface Props {
  owner: string;
  name: string;
  search: Boolean;
  repoFound: Boolean;
  setRepoFound: Function;
}

const GraphQLHandler: React.FC<Props> = ({
  owner,
  name,
  search,
  repoFound,
  setRepoFound,
}) => {
  let [counter, setCounter] = useState<String | null>(null);
  const dispatch = useDispatch();

  const { error, loading, data } = useQuery(SEARCH_REPO_AND_ISSUES_OPEN, {
    variables: { owner: owner, name: name, after: counter },
  });
  const findRepo = () => {
    if (data && search) {
      console.log("This is data: ", data);
      let newIssues: [Object] = data.repository.issues.edges.map(
        (issue: Object) => issue
      );
      dispatch(Actions.updateIssues(newIssues));
      if (!repoFound) setRepoFound(true);
      console.log("Repo is true now");

      if (data.repository.issues.pageInfo.endCursor !== counter)
        setCounter(data.repository.issues.pageInfo.endCursor);
    }
  };

  useEffect(() => findRepo(), [data]);
  return null;
};

export default GraphQLHandler;
