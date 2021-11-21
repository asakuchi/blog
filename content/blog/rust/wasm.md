---
title: 初めてのWebAssembly
date: "2021-11-21T23:00:00+09:00"
description:
tags:
  - "Rust"
  - "JavaScript"
  - "WebAssembly"
---

# 初めての WebAssemby

## Rust でプロジェクト作る

以下のような内容

https://github.com/asakuchi/hello-wasm

ビルド

```bash
wasm-pack build --scope mynpmusername
```

npm に公開

```bash
cd pkg
npm publish --access=public
```

## JavaScript から呼び出す

```bash
yarn add @asakuchi/hello-wasm
```

bootstrap.js （エントリポイント。webpack.config.js に設定する）

```js
import("./index.js").catch(e => console.error("Error importing `index.js`:", e))
```

index.js

```js
import * as wasm from "@asakuchi/hello-wasm"

wasm.greet("hello asakuch npm")
```

※練習では npm に公開したけれど、実際に使うときは npm に公開しないでローカルのパスを指定するのかも。
最適化したい部分だけを Rust にするなら再利用性とかなさそうだし、それを npm に公開してもしょうがないよね、と今は思う。

ローカルを読み込むなら下のような感じで。

package.json

```json
  "dependencies": {
    "hello-wasm": "file:../pkg"
  }
```

参考：https://developer.mozilla.org/ja/docs/WebAssembly/Rust_to_wasm
