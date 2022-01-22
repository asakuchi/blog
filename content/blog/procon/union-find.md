---
title: Union Find
date: "2022-01-23T00:00:00+09:00"
description:
tags:
  - "Rust"
  - "競技プログラミング"
---

# Disjoint Set

Disjoint Set とは互いに素な集合のこと。
簡単に言うと、いくつか集合があったときに、ある要素が複数の要素に属してないよ、みたいな集合のこと。

Find操作と、Union操作ができることから Union-Findデータ構造とも言う。

# 実装

https://github.com/asakuchi/my-procon-library/blob/main/src/disjoint_set.rs

# 活用方法

無向グラフの閉路の検知に使える。

ABC231D
