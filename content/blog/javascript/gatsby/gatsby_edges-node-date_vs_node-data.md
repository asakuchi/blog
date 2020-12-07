---
title: 【Gatsby】 GraphQL の edges.node.data と nodes.data の違いって何？
date: "2020-12-05T19:00:00+09:00"
description:
---

GraphQL の edges.node.data と nodes.data の違いって何？
例えばこういうの

https://www.gatsbyjs.com/tutorial/part-seven/

```graphql
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

stackoverflowに答えがありました。

https://stackoverflow.com/questions/58245183/graphql-gatsby-prismic-difference-between-edges-node-data-and-nodes-data-i

`nodes` は `edges` のショートカットなので同じ、 `edges` を使っておけばOK。
