import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

interface Props {
  setRepoFound: Function;
}

type DefaultRootState = {
  Issues: {
    issues: [
      [
        {
          node: {
            title: String;
            body: string;
            comments: {
              edges: [
                {
                  node: {
                    bodyText: string;
                  };
                }
              ];
            };
          };
        }
      ]
    ];
  };
};

const ListOfIssues: React.FC<Props> = ({ setRepoFound }) => {
  const reduxIssues = useSelector((state: DefaultRootState) => state.Issues);

  console.log("This is redux: ", reduxIssues);

  const { site } = useParams();
  const siteAsInt = parseInt(site + "");
  console.log("Typeofsite", typeof site);
  const navigate = useNavigate();

  useEffect(() => {
    if (reduxIssues.issues[siteAsInt]) setRepoFound(true);
  }, [reduxIssues]);

  return (
    <div>
      {reduxIssues.issues[siteAsInt] && (
        <NavLink to={`/issues/${siteAsInt + 1}`}>Next!</NavLink>
      )}

      {reduxIssues.issues[siteAsInt].map((issue, index) => {
        console.log("This is trigger");
        return (
          <p>
            {index + 1}. {issue.node.title}
            <br />
            <NavLink to={`/issues/${siteAsInt}/${index}`}>See Details</NavLink>
          </p>
        );
      })}
    </div>
  );
};

export default ListOfIssues;
/*
 */
