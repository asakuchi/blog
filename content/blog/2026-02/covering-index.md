---
title: MySQL カバリングインデックス
date: "2026-02-17T00:00:00+09:00"
description:
tags:
  - "MySQL"
---

## 概要

カバリングインデックス（Covering Index）の効果検証。
インデックスに含まれるカラムだけでクエリの結果を返せる場合、テーブルデータそのものへのアクセス（ランダムI/O）を回避できるため、パフォーマンスが向上する。

https://dev.mysql.com/doc/refman/8.0/ja/glossary.html#glos_covering_index

> クエリーによって取得されたすべてのカラムを含むインデックス。 完全なテーブル行を見つけるためのポインタとしてインデックス値を使用する代わりに、クエリーはインデックス構造から値を返し、ディスク I/O を節約します。 InnoDB セカンダリインデックスには主キーカラムも含まれているため、InnoDB では、MyISAM で可能なより多くのインデックスにこの最適化手法を適用できます。

実際にDockerでMySQLを立ち上げ、大量のレコードを投入して挙動と実行速度の差を確認した。

## 環境構築

データベースを作成

```
docker run -d \
    -p 3306:3306 \
    --name mysql-container-name \
    -v mysql-volume-name:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=password \
    mysql:8.4.8
```

```sql
CREATE DATABASE my_db;
```

## テーブル定義とデータ投入

ちょっと良い例が思いつかなかったが、table_1 と table_2 の2つのテーブルをインデックスに含まれていない some_id で join を行う。

```sql
CREATE TABLE table_1 (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    some_id INT,
    dummy_1 VARCHAR(200) NOT NULL,
    dummy_2 VARCHAR(200) NOT NULL,
    dummy_3 VARCHAR(200) NOT NULL,
    INDEX idx_category (category_id)
);

CREATE TABLE table_2 (
    some_id INT,
    branch_number INT,
    some_text CHAR(200),
    PRIMARY KEY (some_id, branch_number)
);

```

ダミーデータを投入。

```sql
SET cte_max_recursion_depth = 100000001;

INSERT INTO table_1 (category_id, some_id, dummy_1, dummy_2, dummy_3)
WITH RECURSIVE seq AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM seq LIMIT 100000000 -- 1億回
)
SELECT
    FLOOR(RAND() * 1000),
    FLOOR(RAND() * 1000),
    MD5(RAND()),
    MD5(RAND()),
    MD5(RAND())
FROM seq;

INSERT INTO table_2 (some_id, branch_number, some_text)
SELECT
    some_id,
    ROW_NUMBER() OVER (PARTITION BY some_id ORDER BY some_id) AS branch_number,
    MD5(RAND())
FROM (
    SELECT some_id
    FROM table_1
    WHERE some_id IS NOT NULL
    ORDER BY RAND()
    LIMIT 10000000 -- 1千万件
) AS random_source;
```

## カバリングインデックスでないインデックスでクエリを実行

まずはカバリングインデックスになっていない状態で検索。
`category_id` にはインデックスがあるが、`some_id` はインデックスに含まれていない。

**クエリ**

```sql
SELECT
  some_id
, branch_number
, some_text
FROM
  table_1
JOIN
  table_2
USING
  (some_id)
WHERE
  category_id = 50
;
```

EXPLAIN結果

```
# id, select_type, table, partitions, type, possible_keys, key, key_len, ref, rows, filtered, Extra
'1', 'SIMPLE', 'table_1', NULL, 'ref', 'idx_category', 'idx_category', '4', 'const', '198784', '100.00', 'Using where'
'1', 'SIMPLE', 'table_2', NULL, 'ref', 'PRIMARY', 'PRIMARY', '4', 'my_db.table_1.some_id', '65', '100.00', NULL
```

`key` に `idx_category` が使われているが、`Extra` は `Using where` となっている。
これはインデックスで対象レコードを特定した後、`some_id` の値を取得するためにテーブル領域へアクセスしていることを意味する。

実行時間
0.090 sec

## カバリングインデックスでクエリを実行

検索条件の `category_id` と、join 条件の `some_id` を含む複合インデックスに変更。

```sql
ALTER TABLE table_1
  DROP INDEX idx_category,
  ADD INDEX idx_category(category_id, some_id)
;
```

同じクエリを実行。

EXPLAIN結果

```
# id, select_type, table, partitions, type, possible_keys, key, key_len, ref, rows, filtered, Extra
'1', 'SIMPLE', 'table_1', NULL, 'ref', 'idx_category', 'idx_category', '4', 'const', '200576', '100.00', 'Using where; Using index'
'1', 'SIMPLE', 'table_2', NULL, 'ref', 'PRIMARY', 'PRIMARY', '4', 'my_db.table_1.some_id', '63', '100.00', NULL
```

`Extra` に `Using index` が表示された。
table_1についてはテーブル領域へのアクセスがスキップされインデックスの情報だけが使われている。

実行時間
0.00097 sec

簡単な計測だがだいたい100倍程度高速になった。

# 参考

- https://dev.mysql.com/doc/refman/8.0/ja/glossary.html#glos_covering_index
- https://dev.mysql.com/doc/refman/8.0/ja/optimizing-innodb-queries.html
