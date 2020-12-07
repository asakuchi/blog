---
title: webpack チュートリアルをやった その1
date: "2020-12-06T19:00:00+09:00"
description:
tags:
  - "webpack"
  - "node.js"
---

`webpack` のチュートリアルやります。

https://webpack.js.org/guides/getting-started/

## Getting Started

`webpack` のインストール

```shell
$ npm install webpack webpack-cli --save-dev
```

`npm-scripts` に build を追加しよう。

`package.json` からはローカルインストールしたパッケージが参照できるので、`npx webpack` ではなく `webpack` で OK。

```json:title=package.json
{
  "scripts": {
    "build": "webpack"
  }
}
```

プロジェクトをこうしよう。

```
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

`webpack.config.js` は `webpack` の設定ファイル。
以下がデフォルト？

```js:title=webpack.config.js
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
}
```

`npm run build` すると dist ディレクトリの JavaScript ファイルにバンドルされるよ。

## Asset Management

CSS、画像、フォント、データ（csv、xml、JSON、etc.） もバンドルできるよ。

CSS については以下の通り。他のも似たような感じ。

```shell
$ npm install --save-dev style-loader css-loader
```

```js:title=webpack.config.js
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
```

```
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- style.css
    |- index.js
```

`npm run build` すると CSS ファイルが JavaScript ファイルにバンドルされるよ。
バンドルされた JavaScript ファイルを実行すると HTML に style タグが追加される。

## Output Management

出力は複数にできたら嬉しいよね、という内容だけど、その恩恵は今のところまだわからないかも。

```js:title=webpack.config.js
const path = require("path")

module.exports = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
}
```

HtmlWebpackPlugin

HTML も出力されるプラグイン。こっちは嬉しいかも。

```shell
$ npm install --save-dev html-webpack-plugin
```

```js:title=webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
}
```

dist フォルダのクリーンナップ

```
$ npm install --save-dev clean-webpack-plugin
```

```js:title=webpack.config.js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Output Management",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
}
```

## Development

mode を develop にしてみましょう。

ここのページだと解説がまるでないけど、こっちのページに何が起こるのか載っている。

https://webpack.js.org/configuration/mode/#mode-development

```js:title=webpack.config.js
module.exports = {
  ～～～
  mode: 'development',
  ～～～
}
```

ソースマップ

エラーが起きた時にバンドル前のファイル名の行数がわかるようになる。

```js:title=webpack.config.js
module.exports = {
  ～～～
  devtool: 'inline-source-map',
  ～～～
}
```

Development Tool

3 つあるけど、大抵の場合は `webpack-dev-server`で OK、とのこと。

```shell
$ npm install --save-dev webpack-dev-server
```

dev server にバンドルされたファイルの場所を教えます。

```js:title=webpack.config.js
module.exports = {
  ～～～
  devServer: {
    contentBase: './dist',
  },
  ～～～
}
```

dev server を簡単に動かせるようにスクリプトを書きます。

```json:title=package.json
{
  "scripts": {
    "start": "webpack serve --open"
  }
}
```

と、書いてあるももの、オプションの指定間違ってるっぽい？？

↓ にしておきます。

```json:title=package.json
{
  "scripts": {
    "start": "webpack serve"
  }
}
```

`npm run start`すると dev server が起動します。
localhost:8080 にアクセスするとバンドル後のファイルにアクセスできます。
ファイルの変更を検知したら再 build とブラウザのリロードを自動でやってくれます。便利。

続く
