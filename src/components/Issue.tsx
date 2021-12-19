import { useParams } from "react-router-dom";

interface Props {
  issues: [
    [
      {
        node: {
          title: string;
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
}

const Issue: React.FC<Props> = ({ issues }) => {
  const { site, singeIssue } = useParams();
  const siteAsInt = parseInt(site + "");
  const singleIssueAsInt = parseInt(singeIssue + "");

  console.log("Issues form Issue", issues);

  return (
    <div>
      <p>{issues[siteAsInt][singleIssueAsInt].node.title}</p>
      {issues[siteAsInt][singleIssueAsInt].node.comments.edges.map(
        (_, index) => (
          <p>
            {
              issues[siteAsInt][singleIssueAsInt].node.comments.edges[index]
                .node.bodyText
            }
          </p>
        )
      )}
    </div>
  );
};

export default Issue;
