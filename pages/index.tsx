import { gql, useQuery } from '@apollo/client';
import { AwesomeLink } from '../components/AwesomeLink';

const AllLinksQuery = gql`
  query allLinksQuery($first: Int!, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

export default function Home() {
  const {
    data, loading, error, fetchMore,
  } = useQuery(AllLinksQuery, { variables: { first: 2 } });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Oh no...
        {error.message}
      </p>
    );
  }

  const { endCursor, hasNextPage } = data.links.pageInfo;

  const loadMoreLinks = async () => {
    await fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const result = fetchMoreResult;
        result.links.edges = [
          ...prevResult.links.edges,
          ...fetchMoreResult.links.edges,
        ];

        return result;
      },
    });
  };

  return (
    <div>
      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({ node }: any) => (
            <AwesomeLink
              key={node.id}
              title={node.title}
              category={node.category}
              url={node.url}
              id={node.id}
              description={node.description}
              imageUrl={node.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={loadMoreLinks}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You&apos;ve reached the end!
            {' '}
          </p>
        )}
      </div>
    </div>
  );
}
