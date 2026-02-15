---
title: React useImperativeHandle を使う
date: "2026-02-11T05:00+09:00"
description:
tags:
  - "React"
---

## 概要

親コンポーネントから子コンポーネントの関数（メソッド）を直接叩きたい時に使うフック。
フォーカスの制御だとか、DOM ネイティブの挙動を制御する場合に使う。

## 子コンポーネント

`useImperativeHandle` で、親に公開したいメソッドを定義したオブジェクトを返す。
レストランのメニューみたいなイメージ？

```tsx
import { useImperativeHandle, useRef } from "react"

export type ChildHandle = {
  focusInput: () => void
  resetInput: () => void
}

type Props = {
  ref: React.RefObject<ChildHandle | null>
}

export const ChildComponent = ({ ref }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => {
    return {
      focusInput: () => {
        inputRef.current?.focus()
      },
      resetInput: () => {
        if (inputRef.current) {
          inputRef.current.value = ""
        }
      },
    }
  })

  return (
    <div>
      <h2>Child Component</h2>
      <input ref={inputRef} type="text" />
    </div>
  )
}
```

## 親コンポーネント

`useRef` で `ChildHandle` 型の Ref オブジェクトを作成し、子コンポーネントの `ref` 属性に渡す。
あとは `ref.current?.メソッド名()` で実行可能。

```tsx
import { useRef } from "react"
import { ChildComponent, type ChildHandle } from "./ChildComponent"

export const ParentComponent = () => {
  const childRef = useRef<ChildHandle>(null)

  const handleFocusClick = () => {
    childRef.current?.focusInput()
  }

  const handleResetClick = () => {
    childRef.current?.resetInput()
  }

  return (
    <div>
      <h1>Parent Component</h1>

      <div className="mb-4 flex gap-2">
        <button type="button" onClick={handleFocusClick}>
          Focus Child Input
        </button>
        <button type="button" onClick={handleResetClick}>
          Reset Child Input
        </button>
      </div>

      <ChildComponent ref={childRef} />
    </div>
  )
}
```

## 補足

生のDOMを直接渡しているのではなくカプセル化してる感じ。

こんなときに使いました。

- ページ内検索を自分で実装した際に、 Ctrl+F が押されたら検索窓がフォーカスされる。
