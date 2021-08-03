---
title: React メモ
date: "2021-03-02T13:00+09:00"
description:
tags:
  - "React"
  - "Node.js"
  - "JavaScript"
---

プロジェクトを作るときの共通設定

# プロジェクト作成

```
npx create-react-app [app-name] --template typescript
```

# TypeScript 最新化

```
yarn upgrade typescript@latest
```

# Lint 導入

```
yarn eslint --init

# 選択肢
To check syntax, find problems, and enforce code style
JavaScript modules (import/export)
React
Yes
Browser
Use a popular style guide
Airbnb: https://github.com/airbnb/javascript
JavaScript
No
```

# package インストール

```
yarn add -D eslint-plugin-react @typescript-eslint/eslint-plugin \
 eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
 eslint-plugin-react-hooks @typescript-eslint/parser \
 prettier eslint-config-prettier \
 stylelint stylelint-config-standard stylelint-order stylelint-config-recess-order \
 eslint-plugin-prefer-arrow \
 husky lint-staged \
 typesync

# ルーティングするなら
yarn add react-router react-router-dom
# titleタグ書き換え(ルーティングするなら必要)
yarn add react-helmet
# redux 必要なら
yarn add redux react-redux
# CSS フレームワーク
yarn add semantic-ui-react semantic-ui-css

```

# ファイルコピー

- .eslintignore
- .eslintrc.js
- .prettierignore
- .prettierrc.js
- .stylelintrc.js
- tsconfig.eslint.json

package.json の scripts に以下を追加

```json
    "fix": "npm run -s format && npm run -s lint:fix",
    "format": "prettier --write --loglevel=warn 'src/**/*.{js,jsx,ts,tsx,gql,graphql,json}'",
    "lint": "npm run -s lint:style; npm run -s lint:es",
    "lint:fix": "npm run -s lint:style:fix && npm run -s lint:es:fix",
    "lint:es": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:es:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:conflict": "eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:style": "stylelint 'src/**/*.{css,less,sass,scss}'",
    "lint:style:fix": "stylelint --fix 'src/**/*.{css,less,sass,scss}'",
    "postinstall": "typesync"
```

以下は説明

---

# Lint 導入

```
yarn eslint --init

# 選択肢
To check syntax, find problems, and enforce code style
JavaScript modules (import/export)
React
Yes
Browser
Use a popular style guide
Airbnb: https://github.com/airbnb/javascript
JavaScript
No
```

```
yarn add -D eslint-plugin-react @typescript-eslint/eslint-plugin \
 eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
 eslint-plugin-react-hooks @typescript-eslint/parser
```

`tsconfig.eslint.json` 作成
`.eslintignore` 作成

# Prettier 導入

```
yarn add -D prettier eslint-config-prettier
```

`.prettierrc` 作成

# stylelint 導入

```
yarn add -D stylelint stylelint-config-standard stylelint-order stylelint-config-recess-order
```

# ESLint プラグイン

```
yarn -D add eslint-plugin-prefer-arrow
```

# commit 時の構文チェック

```
yarn add -D husky lint-staged
```

```
yarn add -D typesync
```

# React Router

ルーティングするなら

```
yarn add react-router react-router-dom
```

# Redux

必要なら

```
yarn add redux react-redux
```

# Semantic UI React

```
yarn add semantic-ui-react semantic-ui-css
```

# React Helmet

title を書き換えるなら
（ルーティングするならいる）

```
yarn add react-helmet
```
