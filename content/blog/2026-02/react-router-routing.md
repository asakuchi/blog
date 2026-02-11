---
title: React Router でファイルベースのルーティングに切り替える
date: "2026-02-11T00:00+09:00"
description:
tags:
  - "React"
  - "React Router"
---

## React Router v7 File-based Routing

React Router v7 のデフォルトテンプレート（`routes.ts` での手動定義）から、Remix v2 ライクなファイルベースルーティング（`flatRoutes`）へ切り替える方法について。

Remix v2 だとデフォルトでファイルベースだったんだけど・・・。

## パッケージのインストール

```bash
npm i @react-router/fs-routes
```

## 設定ファイルの変更

`app/routes.ts` を編集し、手動定義の配列から `flatRoutes` による自動走査へ切り替える。

```diff
// app/routes.ts
- import { type RouteConfig, index } from "@react-router/dev/routes";
+ import { type RouteConfig } from "@react-router/dev/routes";
+ import { flatRoutes } from "@react-router/fs-routes";

- export default [index("routes/home.tsx")] satisfies RouteConfig;
+export default flatRoutes() satisfies RouteConfig;
```

これで `app/routes` 配下のファイルが自動的にルートとして認識されるようになる。

## トップページ

`app/routes/_index.tsx` が `/` を表す特別なファイルとなる。

# 参考

https://reactrouter.com/how-to/file-route-conventions
