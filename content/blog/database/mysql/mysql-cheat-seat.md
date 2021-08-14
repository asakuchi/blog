---
title: MySQL チートシート
date: "2021-08-14T15:00:00+09:00"
description:
tags:
  - "データベース"
  - "MySQL"
---

# Docker でさくっとデータベースを用意する

MYSQL_ROOT_PASSWORD は必須。

```bash
docker run -d \
    -p 3306:3306 \
    --name mysql-container-name \
    -v mysql-volume-name:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=password \
    mysql:8.0.26
```

# MySQL 接続

```bash
mysql -u root -p
```

- -u user_name
- -p[password]
- -P port_num
- -h host_name
- -D db_name

## host_name について

`-h localhost`（もしくは`-h`なし）で接続するときは、あらかじめ `~/.my.cnf` に以下の設定が必要。

```
[client]
protocol=TCP
```

`-h 127.0.0.1` なら 👆 の設定は不要。

## password について

> --password[=password], -p[password]
>
> If given, there must be no space between --password= or -p and the password following it.

パスワードを渡すときはスペースを開けずに渡す。
なんでこんな仕様？？？？

# データベース一覧

```mysql
mysql> show databases;
```

# データベース接続

```mysql
mysql> use mysql
```

# テーブル一覧

```mysql
mysql> show tables;
```

# テーブル定義

```mysql
mysql> desc func;
```
