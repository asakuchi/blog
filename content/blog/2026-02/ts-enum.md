---
title: TypeScript では enum を避けよう
date: "2026-02-11T03:00+09:00"
description:
tags:
  - "TypeScript"
---

## TypeScript enum

enum というのはこういうのですね。

```typescript
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}
```

一見問題なさそうな気はするけど、TypeScript の設計思想に反しているんですね。

https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals

例えば「Provide additional runtime functionality.」というところ。
enum は JavaScript にコンパイルするときにコードを生成します

特に enum は使わなければいけない機能というわけではないので避けれるなら避けましょう。

例えば、

```typescript
enum Status {
  Active,
  Inactive,
}
```

なら

```typescript
type Status = "ACTIVE" | "INACTIVE"
```

これでいいし、

```typescript
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}
```

なら

```typescript
const Status = {
  Active: "ACTIVE",
  Inactive: "INACTIVE",
} as const
```

これでいいですね。

だけどたまに enum で書かなければいけないライブラリがあったりする・・・。
