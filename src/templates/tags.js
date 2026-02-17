import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const TagsTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} 件の記事が "${tag}" にタグ付けされています`;

  return (
    <Layout location={location} title={`Tag: ${tag}`}>
      <div className="tags-page">
        <h1>{tagHeader}</h1>
        <ul style={{ listStyle: `none`, padding: 0 }}>
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title, date } = node.frontmatter;
            return (
              <li key={slug} style={{ marginBottom: `1.5rem` }}>
                <Link to={slug} style={{ textDecoration: `none`, color: `inherit` }}>
                  <h2 style={{ margin: 0, fontSize: `1.5rem`, color: `var(--color-primary)` }}>{title}</h2>
                  <small style={{ color: `#666` }}>{date}</small>
                  <p>{node.excerpt}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <hr />
        <Link to="/tags">すべてのタグを表示</Link>
      </div>
    </Layout>
  );
};

export const Head = ({ pageContext }) => {
  return <Seo title={`Tag: ${pageContext.tag}`} />;
};

export default TagsTemplate;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
          }
          excerpt
        }
      }
    }
  }
`;
