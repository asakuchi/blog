---
title: Node.js で sleep を自分で実装しない
date: "2026-01-30T00:00:00+09:00"
description:
tags:
  - "JavaScript"
  - "TypeScript"
  - "Node"
---

sleep は Node.js の標準関数でできる。

```ts
import { setTimeout } from "node:timers/promises"
await setTimeout(1_000)
```

自分で実装しない。
