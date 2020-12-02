---
title: Gatsby サブディレクトリを設定する
date: "2020-12-03T19:00:00+09:00"
description:
---

ブログをサブディレクトリで公開したいです。
つまり `/` ではなく `/blog` でブログを公開してみます。
以下のドキュメントの通りにするだけです。

https://www.gatsbyjs.com/docs/path-prefix/

gatsby-config.js
```js
module.exports = {
  pathPrefix: `/blog`,
}
```

build

```shell
gatsby build --prefix-paths
```

serve

```shell
gatsby serve --prefix-paths
```

`gatsby develop` には `--prefix-paths` オプションはないみたい。
開発時には必要ないでしょ？ってことかな？

package.jsonを修正しておきます。

```json
  "scripts": {
    "build": "gatsby build --prefix-paths",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "start": "npm run develop",
    "serve": "gatsby serve --prefix-paths",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1"
  }
```
