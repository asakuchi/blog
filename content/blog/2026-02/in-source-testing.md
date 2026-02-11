---
title: Vitest でインソーステスティング
date: "2026-02-11T01:00+09:00"
description:
tags:
  - "React"
  - "Vitest"
---

## Vitest In-Source Testing

インソーステスティングとは、プロダクトコードとテストコードが同じファイル内に入っているもの。
プロダクトファイルとテストファイルを行ったり来たりしなくて便利です。
テストのために export する必要がないのも good。

## Vitest 導入

```
npm install -D vitest
```

```diff
// package.json
{
  "scripts": {
    "build": "react-router build",
    "dev": "react-router dev",
    "start": "react-router-serve ./build/server/index.js",
    "typecheck": "react-router typegen && tsc",
-   "fix": "biome check --write ."
+   "fix": "biome check --write .",
+   "test": "vitest"
  },
}
```

## 設定

### vite.config.ts

`test.includeSource` にソースファイルのパターンを指定する。
また、プロダクションビルド時にテストコードを削除するために `define` で `import.meta.vitest` を `undefined` に置換する設定を入れる。

```typescript
import { defineConfig } from "vite"

export default defineConfig({
  define: {
    "import.meta.vitest": "undefined",
  },
  test: {
    includeSource: ["app/**/*.{js,ts}"],
  },
})
```

### tsconfig.json

`import.meta.vitest` の型定義を認識させるために `types` を追加する。

```json
{
  "compilerOptions": {
    "types": ["vitest/importMeta"]
  }
}
```

## 実装例

`if (import.meta.vitest)` ブロック内にテストが書ける。
この中はプロダクションビルド時に取り除かれるのでアプリに影響なし！

```typescript
// app/utils/sum.ts
export const sum = (a: number, b: number) => {
  return a + b
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it("test sum", () => {
    expect(sum(1, 2)).toBe(3)
  })
}
```

## テスト実行

テストできてる！

```
$ npm test

> test
> vitest


 DEV  v4.0.18 /home/user1/work/repo/my-react-router-app

 ✓ app/utils/sum.ts (1 test) 1ms
   ✓ add function adds two numbers 0ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  00:12:05
   Duration  77ms (transform 6ms, setup 0ms, import 12ms, tests 1ms, environment 0ms)

 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

## ビルド結果の確認

ビルドする前にアプリに組み込みます。

```
import { sum } from "~/utils/sum";

const App = () => {
  const x = sum(1, 2);

  return <div>hello {x}</div>;
};

export default App;
```

ビルド時にはテストコードは削除されている。

```text
// build/server/index.js の一部を抜粋
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const sum = (a, b) => {
  return a + b;
};
const App2 = () => {
  const x = sum(1, 2);
  return /* @__PURE__ */ jsxs("div", {
    children: ["hello ", x]
  });
};
```

## 余談

Rust だとデフォルトでできるのでいいよね。

## 参考

https://vitest.dev/guide/in-source.html
