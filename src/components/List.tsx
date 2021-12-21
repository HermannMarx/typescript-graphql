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
  const [status, setStatus] = useState<string>("OPEN");
  const { site } = useParams();
  const siteAsInt = parseInt(site + "");
  const reduxIssues = useSelector((state: DefaultRootState) => state.Issues);
  const dispatch = useDispatch();

  const handleSearch = (newValue: string) => {
    dispatch(Actions.filterIssues({ term: newValue, status: status }));
    setTerm(newValue);
  };

  const toggleStatus = (currentStatus: string) => {
    if (currentStatus === "OPEN") {
      dispatch(Actions.filterIssues({ term, status: "CLOSED" }));
      setStatus("CLOSED");
    } else {
      dispatch(Actions.filterIssues({ term, status: "OPEN" }));
      setStatus("OPEN");
    }
  };

  useEffect(() => {
    if (reduxIssues.issues[siteAsInt]) setRepoFound(true);
  }, [reduxIssues]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label>
          Search by Term:
          <input
            type="text"
            value={term}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>

        <label>
          Open
          <input
            type="checkbox"
            checked={status === "OPEN"}
            onChange={() => toggleStatus(status)}
          />
        </label>
        <label>
          Closed
          <input
            type="checkbox"
            checked={status === "CLOSED"}
            onChange={() => toggleStatus(status)}
          />
        </label>
      </div>
      <br />
      Issues found:
      {reduxIssues.filteredIssues.length}
      <br />
      {reduxIssues.filteredIssues.length > 0 && (
        <NavLink to="/issues/filter">
          <button>Show filtered Issues</button>
        </NavLink>
      )}
      <br />
      <div style={{ margin: "20px" }}>
        {siteAsInt !== 0 && (
          <NavLink to={`/issues/${siteAsInt - 1}`}>
            <button>Back</button>
          </NavLink>
        )}
        {reduxIssues.issues[siteAsInt + 1] && (
          <NavLink to={`/issues/${siteAsInt + 1}`}>
            <button>Next</button>
          </NavLink>
        )}
      </div>
      {reduxIssues.issues[siteAsInt].map((issue, index) => {
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
