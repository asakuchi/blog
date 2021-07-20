---
title: Docker のメモ
date: "2021-07-19T00:00:00+09:00"
description:
tags:
  - "Docker"
---

# DockerHub でイメージを探す

例えば、apache

https://hub.docker.com/_/httpd

# Dockerfiile なしで

任意のディレクトリで以下のコマンドを実行する。

```bash
$ docker run -dit --name my-apache-app -p 8080:80 -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4
```

index.html を作って`http://localhost:8080/` にアクセスするとそれが見れる。

コンテナ一覧

```bash
docker container ls
```

`-a`オプションで稼働中でないものも表示

```bash
docker container ls -a
```

コンテナ停止

```bash
docker container stop my-apache-app
# or
docker container stop cc32354cdbd5
```

コンテナ開始

```bash
docker container stop my-apache-app
# or
docker container stop cc32354cdbd5
```

コンテナ削除

```bash
docker container rm my-apache-app
# or
docker container rm cc32354cdbd5
```

# 1 回限りのコンテナ

`--rm` をつけると実行後にコンテナが削除される。

```bash
$ docker run --rm -v "$PWD":/usr/src/myapp -w /usr/src/myapp golang:1.16 go run hello.go
```

# 2 つのコンテナ

```bash
$ docker run -dit --name web01 -p 8080:80 httpd:2.4
$ docker run -dit --name web02 -p 8081:80 httpd:2.4

$ docker cp index02.html web02:/usr/local/apache2/htdocs
$ docker cp index02.html web02:/usr/local/apache2/htdocs/index.html
```

```bash
$ docker run -dit --name web01 -v "$PWD"/web01data:/usr/local/apache2/htdocs -p 8080:80 httpd:2.4
$ docker run -dit --name web02 -p 8081:80 httpd:2.4

```

# マウント

- バインドマウント
  - `-v` で指定する方法
  - ホストのディレクトリ
- ボリュームマウント
  - Docker エンジン上の領域

# ボリューム

```bash
$ docker volume create mysqlvolume
```

```bash
$ docker run --name db01 -dit -v mysqlvolume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mypassword mysql:5.7
```

```bash
$ docker run --name db01 -dit --mount type=volume,src=mysqlvolume,dst=/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mypassword mysql:5.7
```

`-v` よりも `--mount` の方がよい。

# バックアップ

```bash
$ docker run --rm --mount type=volume,src=mysqlvolume,dst=/src --mount type=bind,src="$PWD",dst=/dest busybox tar czvf /dest/backup.tar.gz -C /src .
# or
$ docker run --rm --volumes-from db01 --mount type=bind,src="$PWD",dst=/dest busybox tar czvf /dest/backup.tar.gz -C /var/lib/mysql .
```

# リストア

```bash
$ docker run --rm --mount type=volume,src=mysqlvolume,dst=/dest --mount type=bind,src="$PWD",dst=/src busybox tar xvf /src/backup.tar.gz -C /dest
# or
$ docker run --rm --volumes-from db01 --mount type=bind,src="$PWD",dst=/src busybox tar xvf /src/backup.tar.gz -C /var/lib/mysql
```
