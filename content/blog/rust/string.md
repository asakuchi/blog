---
title: Rust 文字列について
date: "2021-07-12T00:00:00+09:00"
---

# 文字列 と 文字

* String
  * Struct
  * 文字列
  * https://doc.rust-lang.org/std/string/struct.String.html

  ```rust
  let text = String("hello world");
  ```

* str

  * プリミティブ
  * 文字列スライス
  * https://doc.rust-lang.org/std/primitive.str.html

  ```rust
  let text = "hello world";
  ```

* char
  * プリミティブ
  * 文字
  * https://doc.rust-lang.org/std/primitive.char.html

  ```rust
  let c = 'h';
  ```

* Chars
  * Struct
  * str のイテレータ
  * https://doc.rust-lang.org/std/str/struct.Chars.html

  ```rust
  let mut chars = "abc".chars();
  ```

# 文字列の結合

## ```format!``` マクロ

format!マクロが一番わかりやすいかも。
String と str はどう組み合わせてもOK。

```rust
>> format!("{}{}", "hello", " world")
"hello world"
>> format!("{}{}", String::from("hello"), " world")
"hello world"
>> format!("{}{}", String::from("hello"), String::from(" world"))
"hello world"
>> format!("{}{}", "hello", String::from(" world"))
"hello world"
```

## ```+``` 演算子

https://doc.rust-lang.org/std/ops/trait.Add.html#impl-Add%3C%26%27_%20str%3E

```+``` 演算子は第一オペランドの所有権がムーブされる。第二オペランドは借用される。

```rust
>> String::from("hello") + " world"
"hello world"
>> String::from("hello") + &String::from(" world")
"hello world"
>> "hello".to_string() + " world"
"hello world"
```
