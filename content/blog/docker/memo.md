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

# ネットワーク

```bash
$ docker network create mydockernet
```

コンテナ作成時に追加

```bash
$ docker run -dit --name web01 -p 8080:80 --net mydockernet httpd:2.4
$ docker run -dit --name web02 -p 8081:80 --net mydockernet httpd:2.4
```

既存コンテナを追加

```bash
$ docker network connect mydockernet web01
$ docker network connect mydockernet web02
```

<!-- # WordPress

```bash
$ docker network create wordpressnet

$ docker volume create wordpress_db_volume

$ docker run --name wordpress-db -dit --mount type=volume,src=wordpress_db_volume,dst=/var/lib/mysql -e MYSQL_ROOT_PASSWORD=myrootpassword -e M
YSQL_DATABASE=wordpressdb -e MYSQL_USER=wordpressuser -e MYSQL_PASSWORD=wordpresspass --net wordpressnet mysql:5.7
b1a6ba6d2c96930a2c67db95a57d404860c9805560d75e0e224ac84eef55c111

$ docker run --name wordpress-app -dit -p 8080:80 -e WORDPRESS_DB_HOST=wordpress-db -e WORDPRESS_DB_NAME=wordpressdb -e WORDPRESS_DB_USER=wordp
ressuser -e WORDPRESS_DB_PASSWORD=wordpresspass --net wordpressnet wordpress
``` -->

# docker-compose

docker-compose.yml

```yml
version: "3"

services:
  wordpress-db:
    image: mysql:5.7
    volumes:
      - wordpress_db_volume:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: myrootpassword
      MYSQL_DATABASE: wordpressdb
      MYSQL_USER: wordpressuser
      MYSQL_PASSWORD: wordpresspass

  wordpress-app:
    depends_on:
      - wordpress-db
    image: wordpress
    ports:
      - 8080:80
    restart: always
    environment:
      WORDPRESS_DB_HOST: wordpress-db
      WORDPRESS_DB_NAME: wordpressdb
      WORDPRESS_DB_USER: wordpressuser
      WORDPRESS_DB_PASSWORD: wordpresspass

volumes:
  wordpress_db_volume:
```

```bash
$ docker-compose up -d
```

```bash
$ docker-compose down
```

# コンテナから image 作成

```bash
$ docker commit webcontent mycustomed_httpd
```

# Dockerfile から image 作成

Dockerfile

```Dockerfile
FROM httpd
COPY index.html /usr/local/apache2/htdocs/
```

```bash
$ docker build . -t myimage01
```

# DockerHub に登録

- DockerHub にリポジトリを作る

```bash
$ docker build . -t myexample
$ docker tag myexample paleapricot/myexample
$ docker login
$ docker push paleapricot/myexample
```

# Amazon ECR に登録

Amazon Elastic Container Registry

- ECR にリポジトリを作る
- push コマンド等は ECR で確認できるのでそれを実行する
  - ログイン
  - イメージ構築
  - タグ付け
  - push
