---
title: nodenv の使い方
date: "2021-08-14T00:00:00+09:00"
description:
tags:
  - "JavaScript"
  - "Node"
  - "anyenv"
  - "nodenv"
---

# 前提

- anyenv がインストール済み
- nodenv がインストール済み

# anyenv アップデート

Node バージョンの一覧が更新される。

```bash
$ anyenv update
```

# バージョン一覧

インストール可能なバージョンの一覧。

```bash
$ nodenv install -l
```

インストール済みのバージョンの一覧。

```bash
$ nodenv versions
```

# 特定のバージョンの Node のインストール

install したら rehash する。

```bash
$ nodenv install 16.6.2
$ nodenv rehash

$ nodenv versions
* 14.4.0 (set by /home/user1/.anyenv/envs/nodenv/version)
  15.9.0
  16.6.2
```

# バージョンの切り替え

```bash
$ nodenv global 16.6.2

$ nodenv versions
  14.4.0
  15.9.0
* 16.6.2 (set by /home/user1/.anyenv/envs/nodenv/version)
```

プロジェクトごとに設定することもできる。

```
$ nodenv local 16.6.2
```

# バージョン確認

```bash
$ node --version
v16.6.2
```
