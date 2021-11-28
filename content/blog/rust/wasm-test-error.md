---
title: wasm-pack test でエラー
date: "2021-11-29T23:00:00+09:00"
description:
tags:
  - "Rust"
  - "JavaScript"
  - "WebAssembly"
---

WSL2 環境で `wasm-pack test` がエラーになる。

```bash
$ wasm-pack test --chrome --headless
[INFO]: Checking for the Wasm target...
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
[INFO]: Installing wasm-bindgen...
    Finished test [unoptimized + debuginfo] target(s) in 0.01s
     Running unittests (target/wasm32-unknown-unknown/debug/deps/wasm_game_of_life-aae857f15fb3814c.wasm)
no tests to run!
     Running tests/web.rs (target/wasm32-unknown-unknown/debug/deps/web-69bc5f1825b7858d.wasm)
Set timeout to 20 seconds...
driver status: exit status: 127
driver stderr:
    /home/user1/.cache/.wasm-pack/chromedriver-526ccf0ba34cb949/chromedriver: error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory

Error: driver failed to bind port during startup
error: test failed, to rerun pass '--test web'
Error: Running Wasm tests with wasm-bindgen-test failed
Caused by: failed to execute `cargo test`: exited with exit status: 1
  full command: "cargo" "test" "--target" "wasm32-unknown-unknown"
```

libnss3.so がないとのことなので入れてみる。

```bash
$ sudo apt-get install libnss3
```

```bash
$ wasm-pack test --chrome --headless
[INFO]: Checking for the Wasm target...
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
[INFO]: Installing wasm-bindgen...
    Finished test [unoptimized + debuginfo] target(s) in 0.01s
     Running unittests (target/wasm32-unknown-unknown/debug/deps/wasm_game_of_life-aae857f15fb3814c.wasm)
no tests to run!
     Running tests/web.rs (target/wasm32-unknown-unknown/debug/deps/web-69bc5f1825b7858d.wasm)
Set timeout to 20 seconds...
Running headless tests in Chrome on `http://127.0.0.1:33971/`
Try find `webdriver.json` for configure browser's capabilities:
Not found
driver status: signal: 9
driver stdout:
    Starting ChromeDriver 96.0.4664.45 (76e4c1bb2ab4671b8beba3444e61c0f17584b2fc-refs/branch-heads/4664@{#947}) on port 33971
    Only local connections are allowed.
    Please see https://chromedriver.chromium.org/security-considerations for suggestions on keeping ChromeDriver safe.
    ChromeDriver was started successfully.

Error: non-200 response code: 404
{"value":{"error":"invalid session id","message":"invalid session id","stacktrace":"#0 0x55aa48159ee3 \u003Cunknown>\n#1 0x55aa47c2749f \u003Cunknown>\n#2 0x55aa47c504ab \u003Cunknown>\n#3 0x55aa47c7b1ec \u003Cunknown>\n#4 0x55aa47c78f42 \u003Cunknown>\n#5 0x55aa47c78777 \u003Cunknown>\n#6 0x55aa47bfeff4 \u003Cunknown>\n#7 0x55aa47bffea0 \u003Cunknown>\n#8 0x55aa4818bbaa \u003Cunknown>\n#9 0x55aa481a1651 \u003Cunknown>\n#10 0x55aa4818cb05 \u003Cunknown>\n#11 0x55aa481a2a68 \u003Cunknown>\n#12 0x55aa4818105f \u003Cunknown>\n#13 0x55aa47bfeb6a \u003Cunknown>\n#14 0x7f02778480b3 \u003Cunknown>\n"}}
error: test failed, to rerun pass '--test web'
Error: Running Wasm tests with wasm-bindgen-test failed
Caused by: failed to execute `cargo test`: exited with exit status: 1
  full command: "cargo" "test" "--target" "wasm32-unknown-unknown"
```

全然わからないが、ググったところ chromium が入ってないのかも？？

```bash
sudo apt-get update
sudo apt-get install  chromium-browser chromium-chromedriver
```

出力を紛失してしまったが以下のようなメッセージが出る・・・。

> Please install it with:
> requires the chromium snap to be installed.
>
> snap install chromium

言われるがまま、`snap install chromium`を打つもダメ・・・。

https://github.com/microsoft/WSL/issues/5126#issuecomment-653715201

を参考に以下をインストール。

```bash
sudo daemonize /usr/bin/unshare --fork --pid --mount-proc /lib/systemd/systemd --system-unit=basic.target
exec sudo nsenter -t $(pidof systemd) -a su - $LOGNAME
snap version

sudo snap install chromium
```

これで行けるようになったっぽい。

```bash
$ wasm-pack test --chrome --headless
[INFO]: Checking for the Wasm target...
    Finished dev [unoptimized + debuginfo] target(s) in 0.01s
[INFO]: Installing wasm-bindgen...
    Finished test [unoptimized + debuginfo] target(s) in 0.01s
     Running unittests (target/wasm32-unknown-unknown/debug/deps/wasm_game_of_life-aae857f15fb3814c.wasm)
no tests to run!
     Running tests/web.rs (target/wasm32-unknown-unknown/debug/deps/web-69bc5f1825b7858d.wasm)
Set timeout to 20 seconds...
Running headless tests in Chrome on `http://127.0.0.1:35055/`
Try find `webdriver.json` for configure browser's capabilities:
Not found
running 2 tests

test web::test_tick ... ok
test web::pass ... ok

test result: ok. 2 passed; 0 failed; 0 ignored
```

今後テスト実行の前には、以下を叩く必要あり。

```bash
$ exec sudo nsenter -t $(pidof systemd) -a su - $LOGNAME
$ wasm-pack test --chrome --headless
```
