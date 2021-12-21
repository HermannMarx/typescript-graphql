import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Actions } from "../reducers";

interface Props {
  setRepoFound: Function;
}

type SingleIssue = { node: { title: string; body: string } };

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

const ListOfIssues: React.FC<Props> = ({ setRepoFound }) => {
  const [term, setTerm] = useState<string>("");
  const reduxIssues = useSelector((state: DefaultRootState) => state.Issues);
  const dispatch = useDispatch();

  console.log("This is redux: ", reduxIssues);

  const { site } = useParams();
  const siteAsInt = parseInt(site + "");
  console.log("Typeofsite", typeof site);
  const navigate = useNavigate();

  const handleSearch = (newValue: string) => {
    dispatch(Actions.filterIssues(newValue));
    setTerm(newValue);
  };

  useEffect(() => {
    if (reduxIssues.issues[siteAsInt]) setRepoFound(true);
  }, [reduxIssues]);

  return (
    <div>
      {reduxIssues.issues[siteAsInt] && (
        <NavLink to={`/issues/${siteAsInt + 1}`}>Next!</NavLink>
      )}
      <label>
        Search by Term
        <input
          type="text"
          value={term}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </label>
      <NavLink to="/issues/filter">
        Issues found: {reduxIssues.filteredIssues.length}
      </NavLink>

      {reduxIssues.issues[siteAsInt].map((issue, index) => {
        console.log("This is trigger");
        return (
          <p>
            {siteAsInt * 50 + index + 1}. {issue.node.title}
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
