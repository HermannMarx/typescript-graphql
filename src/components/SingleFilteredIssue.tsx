import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleIssue: React.FC = () => {
  const { singleIssue } = useParams();
  const singleIssueAsInt = parseInt(singleIssue + "");
  const issuesArray = useSelector((state: any) => state);

  if (issuesArray.Issues.filteredIssues[singleIssueAsInt])
    return (
      <div>
        <h2>{issuesArray.Issues.filteredIssues[singleIssueAsInt].title}</h2>
        <h4
          style={{
            border: "3px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          {issuesArray.Issues.filteredIssues[singleIssueAsInt].body}
        </h4>
        {issuesArray.Issues.filteredIssues[singleIssueAsInt].comments.edges.map(
          (_: any, index: number) => (
            <p
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
              }}
            >
              {index}.{" "}
              {
                issuesArray.Issues.filteredIssues[singleIssueAsInt].comments
                  .edges[index].node.bodyText
              }
            </p>
          )
        )}
      </div>
    );

  return null;
};

export default SingleIssue;
