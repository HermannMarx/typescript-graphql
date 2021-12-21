import { useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface Props {
  setRepoFound: Function;
}

type SingleIssue = { title: string; body: string };

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
    filteredIssues: SingleIssue[];
  };
};

const FilteredList: React.FC<Props> = ({ setRepoFound }) => {
  const reduxIssues = useSelector((state: DefaultRootState) => state.Issues);
  const { site } = useParams();
  const siteAsInt = parseInt(site + "");

  useEffect(() => {
    if (reduxIssues.issues[siteAsInt]) setRepoFound(true);
  }, [reduxIssues]);

  return (
    <div>
      {reduxIssues.filteredIssues
        ? reduxIssues.filteredIssues.map((singleIssue, index) => (
            <p>
              {index}. {singleIssue.title}
              <br />
              <NavLink to={`/issues/filter/${index}`}>See Details</NavLink>
            </p>
          ))
        : null}
    </div>
  );
};

export default FilteredList;
