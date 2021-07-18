---
title: Rust collectついて
date: "2021-07-13T00:00:00+09:00"
---

# これ何

rustlings の iterators3.rs のこの挙動。

```rust
>> vec![27, 297, 38502, 81].into_iter().map(|n| divide(n, 27) ).collect::<Vec<_>>()
[Ok(1), Ok(11), Ok(1426), Ok(3)]
>> vec![27, 297, 38502, 81].into_iter().map(|n| divide(n, 27) ).collect::<Result<Vec<_>, DivisionError>>()
Ok([1, 11, 1426, 3])
```

collect の型パラメータによって戻り値が変わる。

Err が混じってる場合。

```rust
>> vec![27, 297, 38502, 81, 28].into_iter().map(|n| divide(n, 27) ).collect::<Vec<_>>()
[Ok(1), Ok(11), Ok(1426), Ok(3), Err(NotDivisible(NotDivisibleError { dividend: 28, divisor: 27 }))]
>> vec![27, 297, 38502, 81, 28].into_iter().map(|n| divide(n, 27) ).collect::<Result<Vec<_>, DivisionError>>()
Err(NotDivisible(NotDivisibleError { dividend: 28, divisor: 27 }))
```

# collect

https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect

```rust
>> (0..20).map(|n| if n%2 == 1 { Some(n)} else {None}).collect::<Vec<_>>()
[None, Some(1), None, Some(3), None, Some(5), None, Some(7), None, Some(9), None, Some(11), None, Some(13), None, Some(15), None, Some(17), None, Some(19)]

>> vec![1,3,5].into_iter().map(|n| if n%2 == 1 { Some(n)} else {None}).collect::<Option<Vec<_>>>()
Some([1, 3, 5])


```
