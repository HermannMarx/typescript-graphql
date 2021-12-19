import { useNavigate, useParams, NavLink } from "react-router-dom";

interface Props {
  issues: [
    [
      {
        node: {
          title: string;
        };
      }
    ]
  ];
  page: number;
  setPage: Function;
}

const ListOfIssues: React.FC<Props> = ({ issues, page, setPage }) => {
  const { site } = useParams();
  const siteAsInt = parseInt(site + "");
  console.log("Typeofsite", typeof site);
  const navigate = useNavigate();
  console.log("THis is issue: ", issues);
  return (
    <div>
      <NavLink to={`/issues/${siteAsInt + 1}`}>Next</NavLink>
      <button
        onClick={() => {
          setPage(page);
          navigate(`/issues/${siteAsInt + 1}`);
        }}
      >
        More
      </button>
      {issues[siteAsInt].map((issue, index) => {
        return (
          <p>
            {index + 1}. {issue.node.title}
            <NavLink to={`/issues/${siteAsInt}/${index}`}>See Details</NavLink>
          </p>
        );
      })}
    </div>
  );
};

export default ListOfIssues;
