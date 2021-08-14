---
title: PostgreSQL チートシート
date: "2021-08-14T14:00:00+09:00"
description:
tags:
  - "データベース"
  - "PostgreSQL"
---

# Docker でさくっとデータベースを用意する

POSTGRES_PASSWORD は必須。

```bash
docker run --rm -d \
    -p 5432:5432 \
    --name postgresql-container-name \
    -v postgresql-volume-name:/var/lib/postgresql/data \
    -e POSTGRES_PASSWORD=password \
    postgres:13.3-alpine
```

# PostgreSQL 接続

```bash
psql -h localhost -U postgres -d postgres
```

- -h hostname
- -p port
- -U username
- -d dbname

*P*ostgre*SQL* で `psql` かな？

パスワードを渡すオプションはない。代わりに、

- 環境変数`PGPASSWORD`で渡す
- `.pgpass`ファイルで渡す

# データベース一覧

```postgresql
postgres=# \l
```

# データベース接続

```postgresql
postgres=# \c dbname
```

# テーブル一覧

```postgresql
postgres=# \dt
```

# テーブル定義

```postgresql
postgres=# \d my_table
```

テーブルだけじゃなく、`view, materialized view, index, sequence, or foreign table` についても確認可能
