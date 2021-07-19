---
title: Rust VSCode 拡張機能のインストールでエラー
date: "2021-07-19T00:00:00+09:00"
---

# VSCode 拡張機能 に必要なコンポーネントがインストールできない

新しい環境に拡張機能を入れたら右下にポップアップで「必要なコンポーネントインストールする？」みたいなのが出てきたので、言われるがままにインストールするとエラー発生。

```bash
> Executing task: rustup component add rust-src --toolchain stable-x86_64-pc-windows-msvc <

info: downloading component 'rust-src'
info: installing component 'rust-src'
info: rolling back changes
error: failed to install component: 'rust-src', detected conflict: 'lib/rustlib/src/rust/Cargo.lock'
ターミナル プロセス "C:\Program Files\Git\bin\bash.exe '-c', 'rustup component add rust-src --toolchain stable-x86_64-pc-windows-msvc'" が終了コード 1 で終了しました。

ターミナルはタスクで再利用されます、閉じるには任意のキーを押してください。
```

# 解決策

https://github.com/rust-lang/rls/issues/1587

「toolchain を reinstalling してね」
どうやって？？

# toolcahin を reinstalling

rustup の help 見ながら・・・。

```bash
$ rustup toolchain list
stable-x86_64-pc-windows-msvc (default)

$ rustup toolchain uninstall stable-x86_64-pc-windows-msvc
info: uninstalling toolchain 'stable-x86_64-pc-windows-msvc'
info: toolchain 'stable-x86_64-pc-windows-msvc' uninstalled

$ rustup toolchain list
no installed toolchains

$ rustup toolchain install stable-x86_64-pc-windows-msvc
```

VSCode 再起動して再度出てきたポップアップのボタンを押したらインストール問題なかったのでヨシ！
