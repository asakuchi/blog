---
title: Gatsby のチュートリアル part4 でエラー
date: "2020-12-02T23:44:00+09:00"
description: Gatsby tutorial
---

Gatsby のチュートリアルをやっていたところ `gatsby develop` でこけました。

https://www.gatsbyjs.com/tutorial/part-four/#how-gatsbys-data-layer-uses-graphql-to-pull-data-into-components

```shell
$ npm install gatsby-plugin-typography typography react-typography typography-theme-kirkham gatsby-plugin-emotion @emotion/react
```

エラー発生

```shell
$ gatsby develop
success open and validate gatsby-configs - 0.020s
success load plugins - 0.169s
success onPreInit - 0.030s
success initialize cache - 0.027s
success copy gatsby files - 0.122s
success onPreBootstrap - 0.062s
success createSchemaCustomization - 0.001s
success Checking for changed pages - 0.008s
success source and transform nodes - 0.081s
success building schema - 0.234s
info Total nodes: 22, SitePage nodes: 1 (use --verbose for breakdown)
success createPages - 0.004s
success Checking for changed pages - 0.000s
success createPagesStatefully - 0.089s
success update schema - 0.034s
success write out redirect data - 0.003s
success onPostBootstrap - 0.002s
info bootstrap finished - 4.956s
success onPreExtractQueries - 0.001s
success extract queries from components - 0.131s
success write out requires - 0.009s
success run page queries - 0.020s - 3/3 151.58/s
error Generating SSR bundle failed

Can't resolve '@emotion/core' in 'C:\Users\user1\Documents\git\gatsby\tutorial-part-four\.cache'

If you're trying to use a package make sure that '@emotion/core' is installed. If you're trying to use a local file make sure that the path is correct.
error Generating SSR bundle failed

Can't resolve '@emotion/core' in 'C:\Users\user1\Documents\git\gatsby\tutorial-part-four\.cache'

If you're trying to use a package make sure that '@emotion/core' is installed. If you're trying to use a local file make sure that the path is correct.
```

以下のパッケージをインストールしたら解消した。

```shell
$ npm install react-spinners
```

```shell
$ gatsby develop
success open and validate gatsby-configs - 0.017s
success load plugins - 0.148s
success onPreInit - 0.032s
success initialize cache - 0.024s
success copy gatsby files - 0.130s
success onPreBootstrap - 0.048s
success createSchemaCustomization - 0.004s
success Checking for changed pages - 0.004s
success source and transform nodes - 0.058s
success building schema - 0.222s
info Total nodes: 22, SitePage nodes: 1 (use --verbose for breakdown)
success createPages - 0.007s
success Checking for changed pages - 0.000s
success createPagesStatefully - 0.093s
success update schema - 0.040s
success write out redirect data - 0.004s
success onPostBootstrap - 0.003s
info bootstrap finished - 4.923s
success onPreExtractQueries - 0.001s
success extract queries from components - 0.121s
success write out requires - 0.008s
success run page queries - 0.033s - 3/3 90.41/s
⠀
You can now view gatsby-starter-hello-world in the browser.
⠀
  http://localhost:8000/
⠀
View GraphiQL, an in-browser IDE, to explore your site's data and schema
⠀
  http://localhost:8000/___graphql
⠀
Note that the development build is not optimized.
To create a production build, use gatsby build
⠀
success Building development bundle - 9.997s
```

参考
https://github.com/doczjs/docz/issues/577
