import { graphql, Link } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                  {post.frontmatter.tags && (
                    <ul className="tags-list" style={{ display: 'flex', listStyle: 'none', padding: 0, gap: '0.4rem', marginTop: '0.3rem', marginBottom: '0.5rem' }}>
                      {post.frontmatter.tags.map(tag => (
                        <li key={tag}>
                          <Link
                            to={`/tags/${tag.toLowerCase()}/`}
                            style={{
                              padding: '0.1rem 0.4rem',
                              background: '#f0f0f0',
                              borderRadius: '3px',
                              fontSize: '0.75rem',
                              textDecoration: 'none',
                              color: '#666'
                            }}
                          >
                            #{tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </header>
                <section>
                  <p
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: Gatsby uses this for HTML content
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`;
