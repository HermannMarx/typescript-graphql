import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Actions } from "../reducers";

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

  console.log("Filtered page! ", reduxIssues.filteredIssues);

  return (
    <div>
      {reduxIssues.filteredIssues
        ? reduxIssues.filteredIssues.map((singleIssue) => (
            <p>{singleIssue.title}</p>
          ))
        : null}
    </div>
  );
};

export default FilteredList;
