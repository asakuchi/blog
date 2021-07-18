---
title: Rust collectついて
date: "2021-07-16T00:00:00+09:00"
description:
tags:
  - "Rust"
---

# これ何

rustlings の iterators5.rs を解いているときの疑問。

これて test 通ったのだが、 `&&` （二重のアンパサンド）は何か正しくないような・・・。
もしくは`**`（二重のアスタリスク）？

```rust
fn count_iterator(map: &HashMap<String, Progress>, value: Progress) -> usize {
    // map is a hashmap with String keys and Progress values.
    // map = { "variables1": Complete, "from_str": None, ... }

    map.values().filter(|x| x == &&value).count()
}
```

# trait.Iterator.html#method.filter

https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter

iterator のところに書いてあった。

> Because the closure passed to filter() takes a reference, and many iterators iterate over references, this leads to a possibly confusing situation, where the type of the closure is a double reference:

ふむ、values() が参照を返す上に更に filter() が参照を返すので、二重の参照になってしまう、と。

↓ こうが見やすいのかな？

```rust
fn count_iterator(map: &HashMap<String, Progress>, value: Progress) -> usize {
    // map is a hashmap with String keys and Progress values.
    // map = { "variables1": Complete, "from_str": None, ... }

    map.values().filter(|&x| *x == value).count()
}
```
