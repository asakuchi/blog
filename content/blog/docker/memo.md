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
