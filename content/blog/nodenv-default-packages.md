---
title: nodenv default-packages
date: "2021-02-21T19:00+09:00"
description:
tags:
  - "nodenv"
  - "Node.js"
  - "JavaScript"
---

# default-packages とは

ここにパッケージ名を記載しておくと、```nodenv install```したときに自動的にグローバルインストールしてくれる。

```$(nodenv root)/default-packages```

```
yarn
typescript
ts-node
typesync
```

上記ファイルでタイプミスすると ```nodenv install``` でエラーが起きるので注意。

```
user1@apricot:~$ nodenv install 14.4.0
nodenv: /home/user1/.anyenv/envs/nodenv/versions/14.4.0 already exists
continue with installation? (y/N) y
Downloading node-v14.4.0-linux-x64.tar.gz...
-> https://nodejs.org/dist/v14.4.0/node-v14.4.0-linux-x64.tar.gz
Installing node-v14.4.0-linux-x64...
Installed node-v14.4.0-linux-x64 to /home/user1/.anyenv/envs/nodenv/versions/14.4.0

npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/typesyn - Not found
npm ERR! 404
npm ERR! 404  'typesyn@latest' is not in the npm registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/user1/.npm/_logs/2021-02-21T13_47_44_661Z-debug.log
```
