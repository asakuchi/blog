---
title: Lint メモ
date: "2021-02-25T07:00+09:00"
description:
tags:
  - "ESLint"
  - "Node.js"
  - "JavaScript"
---

# ESLint

インストールされているバージョン確認

```
$ npm ls eslint
```

# package のアップグレード

```
$ yarn upgrade-interactive --latest
```

アップグレードしたい package を矢印キーで選んでスペースで選択し、Enter で決定。

# ESLint 設定ファイル

```
yarn eslint --init

✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-airbnb@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.21.5 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1 eslint-plugin-jsx-a11y@^6.4.1 eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 || ^1.7.0 @typescript-eslint/parser@latest
✔ Would you like to install them now with npm? · No / Yes
```

```
$ yarn add -D eslint-plugin-react @typescript-eslint/eslint-plugin \
 eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
 eslint-plugin-react-hooks @typescript-eslint/parser
$ typesync
$ yarn
```

# Prettier

インストール

```
yarn add -D prettier eslint-config-prettier
typesync
yarn
```

.eslintrc.js の追記

extends に 'prettier' を追加

eslint-config-prettier の 8.0.0 からこれだけでよくなった。

https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21


ESLintのルールとPrettierのルールの競合の確認

```
npx eslint-config-prettier 'src/**/*.{js,jsx,ts,tsx}'
```

# stylelint

```
$ yarn add -D stylelint stylelint-config-standard stylelint-order stylelint-config-recess-order
```
