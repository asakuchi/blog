---
title: Rust collectついて
date: "2021-07-16T00:00:00+09:00"
---

# これ何

rustlings の iterators5.rs を解いているときの疑問。

これてtest通ったのだが、 ```&&``` は何か正しくないような・・・。

```rust
fn count_iterator(map: &HashMap<String, Progress>, value: Progress) -> usize {
    // map is a hashmap with String keys and Progress values.
    // map = { "variables1": Complete, "from_str": None, ... }

    map.values().filter(|x| x == &&value).count()
}
```

# struct.HashMap.html#method.values

https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.values

