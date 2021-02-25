---
title: WSL2
date: "2021-02-21T18:00+09:00"
description:
tags:
  - "WSL2"
---

# インストール

Windows でフロントエンドの開発環境を作る手順

https://github.com/oukayuka/Riakuto-StartingReact-ja3.1/blob/master/extra/build-win-env.md

WSL2の初歩メモ

https://qiita.com/rubytomato@github/items/a290ecef2ea86ea8350f

バージョン確認

```
> wsl --list --verbose
  NAME                   STATE           VERSION
* docker-desktop-data    Running         2
  Ubuntu                 Running         2
  docker-desktop         Running         2
```

Docker Desktop をインストールしたときに WSL をごにょごにょしてたので大丈夫かなぁと思って手順進めちゃったけど、Ubuntu のインストール後に確認したら VERSION が 1 だったのでやり直した・・・。

# エラー 0x80073D05

何度もインストールと削除を繰り返してたらこのエラーが発生した。
キャッシュの問題とのこと。

https://answers.microsoft.com/ja-jp/windows/forum/windows8_1-winapps-social/error-code-0x80073d05/dca92092-25d8-4a09-8b62-f3c769c3e111

>  ・キャッシュクリア
> Windows キー + R キーを押して [ファイル名を指定して実行] を起動 > 「wsreset.exe」と入力 ＞  [OK]
> をクリック。

これの後にOS再起動で解消した。

# WSL2内のサーバにWindowsからアクセスする

WSL2内のサーバに localhost で Windows からアクセスできない。
IP指定ならできる。

.wsconfig に以下を追記することで localhost でアクセスできるようになる。

```
localhostForwarding=True
```

参考：
https://qiita.com/snaka/items/a8eee4cfc8f7d733e6ab
