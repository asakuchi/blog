---
title: Gatsby で作ったブログを Github Pages で公開する
date: "2020-12-04T19:00:00+09:00"
description:
---

`Gatsby` で作ったブログを GitHub Pages で公開したい。
以下のドキュメントの通り進める。

https://www.gatsbyjs.com/docs/how-gatsby-works-with-github-pages

（手順の中でサブディレクトリの設定もあるので<a href="../gatsby-sub-directory/">前回</a>の記事いらなかった・・・）

まずは空の `gh-pages` ブランチを作成する。
ここに build 後のファイルを deploy していくことになります。

```shell
$ git checkout --orphan gh-pages
$ git checkout --orphan gh-pages
$ git commit --allow-empty -m "root commit"
```

npm パッケージのインストール。deploy するのに使います。

```
$ npm install gh-pages --save-dev
```

gatsby-config.js の設定変更。（前回実施済みだが）

```js
module.exports = {
  pathPrefix: "/blog",
}
```

package.jsonの修正。

```json
  "scripts": {
    "deploy": "gatsby build --prefix-paths && gh-pages -d public"
  }
```

上記の設定をすることで簡単に deploy できるようになる。

```shell
$ npm run deploy
```

せっかくなので push したら deploy されるように `Github Actions` の設定もする。

<script src="https://gist-it.appspot.com/github/asakuchi/blog/blob/main/.github/workflows/main.yml"></script>
