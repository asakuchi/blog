---
title: Google App Engine ことはじめ
date: "2021-02-03T18:00+09:00"
description:
tags:
  - "Google Cloud Platform"
  - "Google App Engine"
---

# チュートリアルについて

Google Cloud Platform にアクセスして、
ナビゲーションメニューから App Engine をクリック
↓これは僕のプロジェクトだけど、

https://console.cloud.google.com/home?authuser=1&project=asakuchi-sandbox

するとチュートリアルを始めることができる。

# 手順

プログラムを用意する

```
git clone [repository-url]
```


アプリのテスト

```
php -S localhost:8080
```

デプロイ

```
gcloud app deploy
```

デプロイするところで以下のエラーが発生。
『請求先アカウントのリンクを有効化』というのをしなければいけないらしい。


```
ERROR: (gcloud.app.deploy) Error Response: [7] Access Not Configured. Cloud Build has not been used in project asakuchi-sandbox before or it is disabled. Enable it by visiting https://console.developers.go
ogle.com/apis/api/cloudbuild.googleapis.com/overview?project=asakuchi-sandbox then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
```

参考：https://qiita.com/_kyamasan/items/2d76a487c39835e06442

それをしようとおもったのだけど、無料トライアルも始まってしまうのかな？
よくわからないけど、無料トライアル開始。

# デプロイ完了

とっても簡単

http://asakuchi-sandbox.appspot.com/?hl=ja

# アプリケーションの無効化

設定 -> アプリケーションを無効にする

課金を停止したかったらこれ

# Google Cloud SDK

ローカルで操作したかったらこれ？

https://cloud.google.com/sdk/docs/install#interactive?hl=ja
