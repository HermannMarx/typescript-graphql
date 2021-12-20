import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Issue: React.FC = () => {
  const { site, singleIssue } = useParams();
  const siteAsInt = parseInt(site + "");
  const singleIssueAsInt = parseInt(singleIssue + "");
  const issuesArray = useSelector((state: any) => state);

  console.log(
    "SingleIssue",
    issuesArray.Issues.issues[siteAsInt][singleIssueAsInt]
  );
  console.log("SingleIssueasInt: ", singleIssueAsInt);

  if (issuesArray.Issues.issues[siteAsInt])
    return (
      <div>
        <h3>
          {issuesArray.Issues.issues[siteAsInt][singleIssueAsInt].node.title}
        </h3>
        <h4>
          {issuesArray.Issues.issues[siteAsInt][singleIssueAsInt].node.body}
        </h4>
        {issuesArray.Issues.issues[siteAsInt][
          singleIssueAsInt
        ].node.comments.edges.map((_: any, index: number) => (
          <p
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            {
              issuesArray.Issues.issues[siteAsInt][singleIssueAsInt].node
                .comments.edges[index].node.bodyText
            }
          </p>
        ))}
      </div>
    );

  return null;
};

export default Issue;
