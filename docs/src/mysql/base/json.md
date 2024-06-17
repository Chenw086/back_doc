---
title: mysql - JSON
---

# JSON

**特性：**

1. 二进制存储

MySQL 8.0 采用了一种优化的二进制格式存储 JSON 数据，相较于传统的字符串存储式，这种新格式能够更迅速地读取和解析 JSON 文档。该格式允许服务器通过键或数组索直接查找子对象或嵌套值，无需事先读取或解析文档中的所有值。这不仅降低了存储空占用，还提升了查询性能。JSON 列存储的 JSON 文档所需的空间大致与 LONGBLOBLONGTEXT 相同。但要注意，存储在 JSON 列中的 JSON 文档大小受 max_allowed_packet 系统变量的限制

2. 自动验证

当插入或更新包含 JSON 字段的记录时，MySQL 会自动验证所插入的内容是否符合 JSON 格式规范，确保数据的一致性和完整性

3. 索引支持

JSON 列不直接索引，但可以在 JSON 字段中特定路径上创建索引，例如通过 JSON_EXTRACT()函数提取出用于索引的值。此外，MySQ 优化器还会寻找与 JSON 表达式匹配的虚拟列上的兼容索引

4. 部分内容更新

从 MySQL 8.0 开始，优化器可以执行 JSON 列的部分、原地更新，而不是完全删除旧文档并将新文档完全写入列。这种优化可以通过使 JSON_SET()、JSON_REPLACE()或 JSON_REMOVE()等函数进行更新

5. 丰富的 JSON 函数

MySQL 提供了一组用于操作 JSON 值的 SQL 函数，包括创建、操作和搜索

## JSON 操作函数

### 创建 JSON 值

**JSON_ARRAY**

```sql
mysql> SELECT JSON_ARRAY(1, "abc", NULL, TRUE, NOW());
+------------------------------------------------------+
| JSON_ARRAY(1, "abc", NULL, TRUE, NOW())              |
+------------------------------------------------------+
| [1, "abc", null, true, "2024-06-16 23:47:24.000000"] |
+------------------------------------------------------+
1 row in set (0.00 sec)
```

**JSON_OBJECT**

用于创建 JSON 对象

```sql
mysql>  SELECT JSON_OBJECT('name', 'CoderAcademy', 'age', 30) AS person;
+-------------------------------------+
| person                              |
+-------------------------------------+
| {"age": 30, "name": "CoderAcademy"} |
+-------------------------------------+
1 row in set (0.00 sec)
```

`如果传入的不是合法的 JSON 数据，就会报错`

**JSON_QUETE**

用于去除 JSON 字符串中的引号，将一个 JSON 格式化的字符串转换为常规的数据库内可直接使用的字符串。当从 JSON 文档中提取出一原本被双引号包围的字符串时，此函数会移除这些引号，从而便于后续对提取出的数据进行进一步的 SQL 操作或者与其他非 JSON 字段进比较

```sql
mysql> SELECT JSON_QUOTE('[1, 2, 3]') AS json1, JSON_QUOTE('["a", "b", "c"]') AS json2, JSON_QUOTE('{"name":"CoderAcademy", "age": 30}') AS json3;
+-------------+-------------------------+--------------------------------------------+
| json1       | json2                   | json3                                      |
+-------------+-------------------------+--------------------------------------------+
| "[1, 2, 3]" | "[\"a\", \"b\", \"c\"]" | "{\"name\":\"CoderAcademy\", \"age\": 30}" |
+-------------+-------------------------+--------------------------------------------+
1 row in set (0.00 sec)

```

**CAST (value AS JSON)**

::: code-group

```sql [语法]
CAST(value AS JSON)
```

```sql [示例]
mysql> SELECT CAST('["apple", "banana", "cherry"]' AS JSON) AS json1, CAST('{"name":"CoderAcademy", "age": 30}' AS JSON ) AS json2;
+-------------------------------+-------------------------------------+
| json1                         | json2                               |
+-------------------------------+-------------------------------------+
| ["apple", "banana", "cherry"] | {"age": 30, "name": "CoderAcademy"} |
+-------------------------------+-------------------------------------+
1 row in set (0.00 sec)
```

:::

需要注意的是：如果转换的值不符合 JSON 格式规范，则会抛出错误

例如：NULL、不合法的 JSON 字符串、其他转换类型的值

```sql
mysql> SELECT cast('NULL' AS json);
ERROR 3141 (22032): Invalid JSON text in argument 1 to function cast_as_json: "Invalid value." at position 0.
mysql> SELECT CAST('{"name":"CoderAcademy", "age"}' AS JSON );
ERROR 3141 (22032): Invalid JSON text in argument 1 to function cast_as_json: "Missing a colon after a name of object member." at position 29.
```

**JSON_TYPE**

用于查询 JSON 值类型的内置函数，函数返回一个表示给定 JSON 值基本类型的字符串

::: code-group

```sql [语法]
JSON_TYPE(value)

```

```sql [exam]
mysql> SELECT JSON_TYPE(NULL) AS json_null, JSON_TYPE('["a", "b", "c"]') AS json_array, JSON_TYPE('{"name":"CoderAcademy", "age": 30}') AS json_object;
+-----------+------------+-------------+
| json_null | json_array | json_object |
+-----------+------------+-------------+
| NULL      | ARRAY      | OBJECT      |
+-----------+------------+-------------+
1 row in set (0.00 sec)


```

```sql [exam 1]
mysql> SELECT JSON_TYPE('1'), JSON_TYPE('true');
+----------------+-------------------+
| JSON_TYPE('1') | JSON_TYPE('true') |
+----------------+-------------------+
| INTEGER        | BOOLEAN           |
+----------------+-------------------+
1 row in set (0.00 sec)
```

:::

- 取值：

1. "NULL"：如果路径指向的值是 JSON null
2. "OBJECT"：如果路径指向的是一个 JSON 对象（键值对集合）
3. "ARRAY"：如果路径指向的是一个 JSON 数组
4. "STRING"：如果路径指向的是一个 JSON 字符串
5. "NUMBER"：如果路径指向的是一个 JSON 数字（包括整数和浮点数）
6. "TRUE" 或 "FALSE"：如果路径指向的是布尔值 true 或 false

### 合并 JSON

**JSON_MERGE_PRESERVE**

::: danger
8.0.3 以后支持
:::

合并两个或多个 JSON 文档的函数，并保留所有键值对

::: code-group

```sql [语法]
JSON_MERGE_PRESERVE(json_doc, json_doc[, json_doc] ...)
```

```sql [示例]
mysql> SELECT JSON_MERGE_PRESERVE('["a", 1]', '{"key": "value"}') AS json_value;
+----------------------------+
| json_value                 |
+----------------------------+
| ["a", 1, {"key": "value"}] |
+----------------------------+
1 row in set (0.01 sec)
```

:::

在处理重复键时，如果是合并对象(JOSN_OBJECT)，将 value 自动包装为数组，并通过组合值的方式合并数组

```sql
mysql> SELECT JSON_MERGE_PRESERVE('{"name":"CoderAcademy", "age": 30}', '{"name":"CoderAcademy", "age": 35}') AS json_value;
+-------------------------------------------------------------+
| json_value                                                  |
+-------------------------------------------------------------+
| {"age": [30, 35], "name": ["CoderAcademy", "CoderAcademy"]} |
+-------------------------------------------------------------+
1 row in set (0.00 sec)
```

如果是合并数组(JSON_ARRAY)，将它们的值组合成一个数组，作为结果中该键的值

```sql
mysql> SELECT JSON_MERGE_PRESERVE('{"hobbies":["Java", "Mysql"]}', '{"hobbies":["Python", "Mysql"]}') AS json_value;
+---------------------------------------------------+
| json_value                                        |
+---------------------------------------------------+
| {"hobbies": ["Java", "Mysql", "Python", "Mysql"]} |
+---------------------------------------------------+
1 row in set (0.00 sec)
```

**JSON_PATCH**

用于合并或多个 JSON 文档的函数，仅保留最后一个值

::: danger
8.0.3 之后支持
:::

::: code-group

```sql [语法]
JSON_MERGE_PATCH(json_doc, json_doc[, json_doc] ...)
```

```sql [示例 1]
mysql> SELECT JSON_MERGE_PATCH('["a", 1]', '{"key": "value"}') AS json_value
    -> ;
+------------------+
| json_value       |
+------------------+
| {"key": "value"} |
+------------------+
1 row in set (0.00 sec)
```

```sql [示例 2]
mysql> SELECT JSON_MERGE_PATCH('{"name":"CoderAcademy", "age": 30}', '{"name":"CoderAcademy", "age": 35}') AS json_value;
+-------------------------------------+
| json_value                          |
+-------------------------------------+
| {"age": 35, "name": "CoderAcademy"} |
+-------------------------------------+
1 row in set (0.00 sec)

```

:::

### JSON 搜索

**JSON_CONTAINS**

MySQL8.0 中引入的用于检查 JSON 数组或对象是否包含特定值或键值对的函数

JSON_CONTAINS 函数返回 1 表示包含，返回 0 表示不包含

```sql
JSON_CONTAINS(json_doc, candidate[, path])
```

> 其中 json_doc 是要检查的 JSON 文档，通常是一个列名或者 JSON 字符串表达式。candidate 是要查找的值。而 path（可选）指定在 JSON 文档中的路径，用于更精确地定位要检查的元素，如果没有指定路径，则在整个 JSON 文档中搜索给定的候选值

::: code-group

```sql [示例 1]
mysql> SELECT JSON_CONTAINS('{"a": 1, "b": 2, "c": {"d": 4}}', '1', '$.a') AS contains_value;
+----------------+
| contains_value |
+----------------+
|              1 |
+----------------+
1 row in set (0.00 sec)
```

```sql [示例 2]
mysql> SELECT JSON_CONTAINS('[ "apple", "banana", "cherry" ]', '"apple"') AS contains_apple;
+----------------+
| contains_apple |
+----------------+
|              1 |
+----------------+
1 row in set (0.00 sec)

```

```sql [示例 3]
mysql> SELECT JSON_CONTAINS('{"fruits": ["apple", "banana", "cherry"]}', '"apple"', '$.fruits') AS contains_apple_in_path;
+------------------------+
| contains_apple_in_path |
+------------------------+
|                      1 |
+------------------------+
1 row in set (0.00 sec)

```

```sql [示例 4: 在 where 中使用]
mysql> SELECT * FROM test_json WHERE JSON_CONTAINS(json_data, '"apple"', '$.fruits');
+----+-------------------------------------------+---------------------+
| id | json_data                                 | create_time         |
+----+-------------------------------------------+---------------------+
|  3 | {"fruits": ["apple", "banana", "cherry"]} | 2024-02-05 07:28:40 |
+----+-------------------------------------------+---------------------+
1 row in set (0.00 sec)

```

:::

::: warning 提示
在使用 JSON_CONTAINS 时，注意数据类型的匹配，确保值的类型与 JSON 中的类型一致

SON_CONTAINS 参数传递匹配值是''并不代表他是一个字符串

例如上述第一个例子：我们搜索 1，使用'1'，搜索 apple 时，使用'"apple"'

同时 JSON_CONTAINS()不支持对嵌套 JSON 文档进行递归搜索，它只针对 JSON 路径指定的位置进行比较
:::

**JSON_CONTAINS_PATH**

用于检查 JSON 文档中是否存在指定路径的函数。与 JSON_CONTAINS()函数不同，JSON_CONTAINS_PATH() 不检查路径对应的值是否匹配某个特定值，而是仅判断 JSON 文档内是否存在指定的路径结构

::: code-group

```sql [语法]
JSON_CONTAINS_PATH(json_doc, one_or_all, path[, path] ...)
```

```sql [创建变量]
SET @json_data = '{"name":"John","age":30,"hobbies":["reading","coding"],"address":{"city":"New York","country":"USA"}}';
```

```sql [示例 1]
mysql> SELECT
    ->   JSON_CONTAINS_PATH(@json_data, 'one', '$.name') AS has_name,
    ->   JSON_CONTAINS_PATH(@json_data, 'one', '$.address.country') AS has_country,
    ->   JSON_CONTAINS_PATH(@json_data, 'all', '$.hobbies[0]', '$.hobbies[1]') AS has_both_hobbies;
+----------+-------------+------------------+
| has_name | has_country | has_both_hobbies |
+----------+-------------+------------------+
|        1 |           1 |                1 |
+----------+-------------+------------------+
1 row in set (0.00 sec)

```

```sql [示例 2]
mysql> select JSON_CONTAINS_PATH(@json_data, 'one', '$.address.country') as test;
+------+
| test |
+------+
|    1 |
+------+
1 row in set (0.00 sec)
```

:::

**JSON_EXTRACT**

从 JSON 字段中提取指定路径的值

::: code-group

```sql [语法]
JSON_EXTRACT(json_doc, path[, path] ...)
```

```sql [创建数据变量]
SET @user_info = '{"name":"John Doe","age":30,"hobbies":["reading","coding"],"address":{"street":"123 Main St","city":"New York"}}';
```

```sql [示例 1]
mysql> SELECT
    ->     JSON_EXTRACT(@user_info, '$.name') AS name,
    ->     JSON_EXTRACT(@user_info, '$.age') AS age,
    ->     JSON_EXTRACT(@user_info, '$.hobbies[0]') AS first_hobby,
    ->     JSON_EXTRACT(@user_info, '$.address.city') AS city;
+------------+------+-------------+------------+
| name       | age  | first_hobby | city       |
+------------+------+-------------+------------+
| "John Doe" | 30   | "reading"   | "New York" |
+------------+------+-------------+------------+
1 row in set (0.01 sec)
```

:::

::: warning PATH 中的一些规则

1. 点.运算符

   用于访问嵌套的对象属性。例如：$.name 表示访问顶级对象的 "name" 属性

2. 方括号[]运算符

   用于访问数组元素。对于数组索引，使用数字表示位置，从 0 开始。例如：$.hobbies[0] 表示访问顶级对象 "hobbies" 数组的第一个元素

3. 多路径查询

   在一个函数调用中可以指定多个路径，每个路径之间用逗号分隔。例如：JSON_EXTRACT(json_column, '$.path1', '$.path2')

:::

**JSON_KEYS**

用于从 JSON 文档中提取所有键（key）的一个函数，它返回一个包含 JSON 对象所有键名的数组。这对于需要获取或操作 JSON 对象内部属性名称时非常有用

::: code-group

```sql [语法]
JSON_KEYS(json_doc[, path])
```

```sql [示例 1]
mysql> SELECT JSON_KEYS(json_data) AS top_level_keys FROM test_json;
+---------------------------------------+
| top_level_keys                        |
+---------------------------------------+
| ["age", "name", "address", "hobbies"] |
| ["age", "name", "address", "hobbies"] |
| ["fruits"]                            |
+---------------------------------------+
3 rows in set (0.00 sec)
```

```sql [示例 2]
mysql> SELECT JSON_KEYS(json_data, '$.address') AS address_keys FROM test_json WHERE JSON_CONTAINS_PATH(json_data, 'one', '$.address');
+---------------------+
| address_keys        |
+---------------------+
| ["city", "street"]  |
| ["city", "country"] |
+---------------------+
2 rows in set (0.00 sec)

```

:::

**JSON_OVERLAPS**

该函数会检查两个 JSON 对象，并返回布尔值。如果至少有一个键存在于两个对象中且对应值相等，则返回真（1），否则返回假（0）。这个函数并不关注两个 JSON 对象的所有内容，仅针对有交集的键值对进行比较

::: code-group

```sql [语法]
JSON_OVERLAPS(json_doc1, json_doc2)
```

```sql [示例 1]
mysql> SET @doc1 = '{"name": "John", "age": 30}';
Query OK, 0 rows affected (0.00 sec)

mysql> SET @doc2 = '{"name": "John", "address": "New York"}';
Query OK, 0 rows affected (0.01 sec)

mysql> SELECT JSON_OVERLAPS(@doc1, @doc2) AS do_overlap;
+------------+
| do_overlap |
+------------+
|          1 |
+------------+
1 row in set (0.00 sec)

```

:::

::: danger

1. 如果两个 JSON 对象没有共享的键，或者共享的键对应的值不等，则此函数为 0
2. 它只适用于 JSON 对象

:::

**JSON_SEARCH**

用于在 JSON 文档中搜索指定的字符串值，并返回找到该值的第一个匹配路径。这个函数对于从 JSON 数据结构中检索特定值非常有用

如果没有找到就返回 NULL

::: code-group

```sql [语法]
JSON_SEARCH(json_doc, one_or_all, search_str[, escape_char[, path] ...])
```

```sql [示例 1]
mysql> SELECT
    ->   JSON_SEARCH(json_data, 'one', 'John') AS name_path,
    ->   JSON_SEARCH(json_data, 'all', 'New York') AS main_street_path
    -> FROM test_json;
+-----------+------------------+
| name_path | main_street_path |
+-----------+------------------+
| NULL      | "$.address.city" |
| "$.name"  | "$.address.city" |
| NULL      | NULL             |
+-----------+------------------+
3 rows in set (0.00 sec)
```

:::

::: warning
注意，JSON_SEARCH()主要适用于搜索字符串类型的值，在 MySQL 8.0 及以前版本中，它不支持直接搜索数值型或其他非字符串类型的内容。此外，该函数可能无法处理嵌套的 JSON 对象或数组内的复杂搜索场景，因为它只能返回单个键值对路径，而不是深度遍历整个 JSON 结构以寻找匹配项
:::

**JSON_VALUE**

返回的是位于给定路径下的 JSON 文档中的标量值（字符串、数字或布尔值），而不是 JSON 格式的值

这与 JSON_EXTRACT() 函数不同，后者返回的是 JSON 格式的值，即使提取的是标量值也是如此

::: code-group

```sql [语法]
JSON_VALUE(json_doc, path)

```

```sql [示例 1]
SELECT
   JSON_VALUE(json_data, '$.name') AS name,
   JSON_VALUE(json_data, '$.age') AS age,
   JSON_VALUE(json_data, '$.is_student') AS is_student
 FROM test_json;
+----------+------+------------+
| name     | age  | is_student |
+----------+------+------------+
| John Doe | 30   | NULL       |
| John     | 30   | NULL       |
| NULL     | NULL | NULL       |
| John Doe | 30   | true       |
+----------+------+------------+
4 rows in set (0.01 sec)
```

:::

::: info
函数简化了 JSON 数据在 SQL 查询中的处理，特别是将 JSON 字段的值作为普通 SQL 数据类型进行比较、聚合或其余操作时

8.0.21 版本开始提供 JSON_VALUE

:::

- VALUE 对比 EXTRACT

::: code-group

```sql [建表插入数据]
CREATE TABLE json_test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    json_data JSON
);

INSERT INTO json_test (json_data) VALUES
('{"name": "John Doe", "age": 30, "hobbies": ["reading", "coding"], "address": {"street": "123 Main St", "city": "New York"}}');

```

```sql [EXTRACT]
mysql> SELECT
    ->     JSON_EXTRACT(json_data, '$.name') AS name_json,
    ->     JSON_EXTRACT(json_data, '$.age') AS age_json,
    ->     JSON_EXTRACT(json_data, '$.hobbies') AS hobbies_json,
    ->     JSON_EXTRACT(json_data, '$.address') AS address_json
    -> FROM
    ->     json_test;
+------------+----------+-----------------------+-----------------------------------------------+
| name_json  | age_json | hobbies_json          | address_json                                  |
+------------+----------+-----------------------+-----------------------------------------------+
| "John Doe" | 30       | ["reading", "coding"] | {"city": "New York", "street": "123 Main St"} |
+------------+----------+-----------------------+-----------------------------------------------+
1 row in set (0.00 sec)


```

```sql [VALUE]
mysql> SELECT
    ->     JSON_VALUE(json_data, '$.name') AS name_scalar,
    ->     JSON_VALUE(json_data, '$.age') AS age_scalar,
    ->     JSON_VALUE(json_data, '$.hobbies[0]') AS first_hobby_scalar,
    ->     JSON_VALUE(json_data, '$.address.city') AS city_scalar
    -> FROM
    ->     json_test;
+-------------+------------+--------------------+-------------+
| name_scalar | age_scalar | first_hobby_scalar | city_scalar |
+-------------+------------+--------------------+-------------+
| John Doe    | 30         | reading            | New York    |
+-------------+------------+--------------------+-------------+
1 row in set (0.00 sec)
```

:::

结果说明：

JSON_EXTRACT 返回 JSON 类型的值：

1. $.name 返回 "John Doe"，带有引号，表示它是一个 JSON 字符串
2. $.age 返回 30，是一个 JSON 数字
3. $.hobbies 返回 ["reading", "coding"]，是一个 JSON 数组
4. $.address 返回 {"street": "123 Main St", "city": "New York"}，是一个 JSON 对象

JSON_VALUE ：

1. $.name 返回 John Doe，去掉了引号，表示它是一个简单的字符串
2. $.age 返回 30，是一个数字
3. $.hobbies[0] 返回 reading，是一个字符串
4. $.address.city 返回 New York，是一个字符串

场景：

1. JSON_EXTRACT 适用于需要完整的 JSON 值（包括对象、数组等）的场景
2. JSON_VALUE 适用于需要简单标量值的场景

### JSON 数据修改

**JSON_ARRAY_APPEND**

用于向 JSON 数组末尾追加元素的函数。这个函数允许你在现有的 JSON 数组中添加新的元素，无论是标量值还是嵌套的 JSON 对象或数组。

::: code-group

```sql [语法]
JSON_ARRAY_APPEND(json_doc, path, val[, path, val] ...)
```

```sql [示例 1]
mysql> SELECT json_data FROM test_json WHERE id = 3;
+-------------------------------------------+
| json_data                                 |
+-------------------------------------------+
| {"fruits": ["apple", "banana", "cherry"]} |
+-------------------------------------------+
1 row in set (0.00 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_ARRAY_APPEND(json_data, '$.fruits', 'cherry')
    -> WHERE id = 3;
Query OK, 1 row affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 3;
+-----------------------------------------------------+
| json_data                                           |
+-----------------------------------------------------+
| {"fruits": ["apple", "banana", "cherry", "cherry"]} |
+-----------------------------------------------------+
1 row in set (0.00 sec)
```

:::

如果 path 所指的对象不是一个数组，那么在进行追加操作之前，mysql 会将该对象转换为一个只有一个元素的新数组

```sql
mysql> SELECT json_data FROM test_json WHERE id = 5;
+--------------------------------------------------------------+
| json_data                                                    |
+--------------------------------------------------------------+
| {"fruits": ["apple", "banana", "cherry"], "hobbies": "Java"} |
+--------------------------------------------------------------+
1 row in set (0.01 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_ARRAY_APPEND(json_data, '$.hobbies', 'Python')
    -> WHERE id = 5;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 5;
+--------------------------------------------------------------------------+
| json_data                                                                |
+--------------------------------------------------------------------------+
| {"fruits": ["apple", "banana", "cherry"], "hobbies": ["Java", "Python"]} |
+--------------------------------------------------------------------------+
1 row in set (0.00 sec)

```

`此函数适用于需要动态修改和扩展数据库内存储JSON数组的情况，特别是在处理具有可变长度列表的数据时特别有用`

**JSON_ARRAY_INSERT**

用于向 JSON 数组的特定位置插入元素的函数。这个函数允许你在现有的 JSON 数组的指定索引处插入一个新元素，这个元素可以是单个元素值、JSON 数组、JSON 对象

::: code-group

```sql [语法]
JSON_ARRAY_INSERT(json_doc, path, val[, path, val] ...)
```

```sql [示例 1]
mysql> SELECT json_data FROM test_json WHERE id = 6;
+----------------------------------------------------+
| json_data                                          |
+----------------------------------------------------+
| {"fruits": ["apple", "banana"], "hobbies": "Java"} |
+----------------------------------------------------+
1 row in set (0.00 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_ARRAY_INSERT(json_data, '$.fruits[0]', 'cherry')
    -> WHERE id = 6;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 6;
+--------------------------------------------------------------+
| json_data                                                    |
+--------------------------------------------------------------+
| {"fruits": ["cherry", "apple", "banana"], "hobbies": "Java"} |
+--------------------------------------------------------------+
1 row in set (0.00 sec)

```

```sql [插入一个数组]
mysql> UPDATE test_json
    -> SET json_data = JSON_ARRAY_INSERT(json_data, '$.fruits[0]', CAST('["cherry", "orange"]' AS JSON))
    -> WHERE id = 7;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 7;
+--------------------------------------------------------------------------+
| json_data                                                                |
+--------------------------------------------------------------------------+
| {"fruits": [["cherry", "orange"], "apple", "banana"], "hobbies": "Java"} |
+--------------------------------------------------------------------------+

1 row in set (0.00 sec)
```

:::

**JSON_INSERT**
用于向 JSON 文档插入新键值对或替换已存在键对应值的一个函数

如果在 JSON 文档中，路径已存在，则不会覆盖现有的文档值

如果指定的路径不存在于原始 JSON 文档中，则会在该路径处创建新的键值对

::: code-group

```sql [语法]
JSON_INSERT(json_doc, path, val[, path, val] ...)
```

```sql [已存在]
mysql> SELECT json_data FROM test_json WHERE id = 8;
+----------------------------------------------------+
| json_data                                          |
+----------------------------------------------------+
| {"fruits": ["apple", "banana"], "hobbies": "Java"} |
+----------------------------------------------------+
1 row in set (0.00 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_INSERT(json_data, '$.hobbies', 'Python')
    -> WHERE id = 8;
Query OK, 0 rows affected (0.00 sec)
Rows matched: 1  Changed: 0  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 8;
+----------------------------------------------------+
| json_data                                          |
+----------------------------------------------------+
| {"fruits": ["apple", "banana"], "hobbies": "Java"} |
+----------------------------------------------------+
1 row in set (0.00 sec)

```

```sql [已存在]
mysql> SELECT json_data FROM test_json WHERE id = 9;
+---------------------------------+
| json_data                       |
+---------------------------------+
| {"fruits": ["apple", "banana"]} |
+---------------------------------+
1 row in set (0.00 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_INSERT(json_data, '$.hobbies', CAST('["Java", "Python"]' AS JSON),
    ->     '$.name', 'CoderAcademy',
    ->     '$.address', cast('{"city": "New York", "street": "123 Main St"}' AS JSON))
    -> WHERE id = 9;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 9;
+--------------------------------------------------------------------------------------------------------------------------------------------------+
| json_data                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
| {"name": "CoderAcademy", "fruits": ["apple", "banana"], "address": {"city": "New York", "street": "123 Main St"}, "hobbies": ["Java", "Python"]} |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

```

:::

**JSON_REMOVE**

用于从 JSON 文档中删除数据

::: code-group

```sql [语法]
JSON_REMOVE(json_doc, path[, path] ...)

```

```sql [删除对应键值]
mysql> SELECT json_data FROM test_json WHERE id = 10;
+----------------------------------------------------+
| json_data                                          |
+----------------------------------------------------+
| {"fruits": ["apple", "banana"], "hobbies": "Java"} |
+----------------------------------------------------+
1 row in set (0.00 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_REMOVE(json_data, '$.hobbies')
    -> WHERE id = 10;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 10;
+---------------------------------+
| json_data                       |
+---------------------------------+
| {"fruits": ["apple", "banana"]} |
+---------------------------------+
1 row in set (0.00 sec)

```

```sql [删除数组指定索引位]
mysql> UPDATE test_json
    -> SET json_data = JSON_REMOVE(json_data, '$.fruits[1]')
    -> WHERE id = 10;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 10;
+-----------------------+
| json_data             |
+-----------------------+
| {"fruits": ["apple"]} |
+-----------------------+
1 row in set (0.00 sec)

```

```sql [删除置顶位置没值]
mysql> UPDATE test_json
    -> SET json_data = JSON_REMOVE(json_data, '$.fruits[1]')
    -> WHERE id = 10;
Query OK, 0 rows affected (0.00 sec)
Rows matched: 1  Changed: 0  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 10;
+-----------------------+
| json_data             |
+-----------------------+
| {"fruits": ["apple"]} |
+-----------------------+
1 row in set (0.00 sec)

```

:::

**JSON_REPLACE**

函数用于替换 JSON 文档中的现有值

如果替换路径在文档中存在，则就用新值覆盖文档中原值，否则不会替换，也不会报错

::: code-group

```sql [语法]
JSON_REPLACE(json_doc, path, val[, path, val] ...)
```

```sql [如果没有置顶位置]
mysql> SELECT json_data FROM test_json WHERE id = 11;
+----------------------------------------------------+
| json_data                                          |
+----------------------------------------------------+
| {"fruits": ["apple", "banana"], "hobbies": "Java"} |
+----------------------------------------------------+
1 row in set (0.01 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_REPLACE(json_data, '$.name', 'CoderAcademy')
    -> WHERE id = 11;
Query OK, 0 rows affected (0.00 sec)
Rows matched: 1  Changed: 0  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 11;
+----------------------------------------------------+
| json_data                                          |
+----------------------------------------------------+
| {"fruits": ["apple", "banana"], "hobbies": "Java"} |
+----------------------------------------------------+
1 row in set (0.00 sec)

```

```sql [如果有指定位置]
mysql> UPDATE test_json
    -> SET json_data = JSON_REPLACE(json_data, '$.fruits[1]', 'orange', '$.hobbies',  CAST('["Java", "Python"]' AS JSON))
    -> WHERE id = 11;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 11;
+----------------------------------------------------------------+
| json_data                                                      |
+----------------------------------------------------------------+
| {"fruits": ["apple", "orange"], "hobbies": ["Java", "Python"]} |
+----------------------------------------------------------------+
1 row in set (0.00 sec)

```

:::

**JSON_SET**

用于在 JSON 文档中插入或更新数据

如果路径在文档中已存在，则会覆盖原文档中值，如果不存在，则插入新值

::: code-group

```sql [语法]
JSON_SET(json_doc, path, val[, path, val] ...)
```

```sql [示例]
mysql> SELECT json_data FROM test_json WHERE id = 12;
+----------------------------------------------------+
| json_data                                          |
+----------------------------------------------------+
| {"fruits": ["apple", "banana"], "hobbies": "Java"} |
+----------------------------------------------------+
1 row in set (0.00 sec)

mysql> UPDATE test_json
    -> SET json_data = JSON_SET(json_data, '$.fruits[1]', 'orange',
    ->     '$.hobbies', CAST('["Java", "Python"]' AS JSON),
    ->     '$.name', 'CoderAcademy',
    ->     '$.address', cast('{"city": "New York", "street": "123 Main St"}' AS JSON))
    -> WHERE id = 12;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT json_data FROM test_json WHERE id = 12;
+--------------------------------------------------------------------------------------------------------------------------------------------------+
| json_data                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
| {"name": "CoderAcademy", "fruits": ["apple", "orange"], "address": {"city": "New York", "street": "123 Main St"}, "hobbies": ["Java", "Python"]} |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

```

:::

## 索引

### 路径索引

MySQL 8.0 引入了 JSON 路径索引，允许在 JSON 对象的特定路径上创建索引，以便更高效地执行 JSON 路径查询

路径索引允许在 JSON 对象中的特定路径上进行范围查询、排序和过滤。我们以查询地址信息中 country 等于"US"为例

::: code-group

```sql [JSON_CONTAINS]
SELECT * FROM user_info WHERE JSON_CONTAINS(address, '"US"', '$.country');
```

```sql [JSON_VALUE]
SELECT * FROM user_info WHERE JSON_VALUE(address, '$.country') = "US";
```

```sql [JSON_EXTRACT]
SELECT * FROM user_info WHERE JSON_EXTRACT(address, '$.country') = 'US';
```

```sql [->>]
SELECT * FROM user_info WHERE address->>"$.country" = "US";

-- 或者

SELECT * FROM user_info WHERE CAST(address->>"$.country" AS CHAR(30)) = "US";

```

:::

在 JSON 类型字段上创建索引时，要遵守的规则是要确保索引表达式与查询时的条件表达式匹配，这样 MySQL 才能正确地使用索引进行优化查询

所以针对不同的 sql 查询，提供不同的索引

- 使用 JSON_EXTRACT
  我们可以采取新增一个虚拟列的方式去使用索引，比如我们新增一个 country 的虚拟列，然后在虚拟列上增加索引

::: code-group

```sql [添加索引]
-- 添加生成的虚拟列  
ALTER TABLE user_info  
ADD COLUMN country VARCHAR(255) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(address, '$.country'))) STORED;  

-- 在生成的列上创建索引  
CREATE INDEX idx_json_country ON user_info(country);

```

```sql [查看执行计划]
mysql> EXPLAIN SELECT * FROM user_info WHERE country = 'US';
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------+
| id | select_type | table     | partitions | type | possible_keys    | key              | key_len | ref   | rows | filtered | Extra |
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | user_info | NULL       | ref  | idx_json_country | idx_json_country | 1023    | const |    2 |   100.00 | NULL  |
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------+
1 row in set, 1 warning (0.01 sec)

```

:::

可以看出使用了索引： idx_json_country

- 使用 ->> 运算符

使用 ->> 运算符：在 MySQL 中，->> 是一个用于从 JSON 值中提取数据的运算符。它等同于 JSON_UNQUOTE(JSON_EXTRACT(...))。这意味着它会从 JSON 对象中提取一个值，并去除该值的引号，使其成为一个普通的字符串或数值

转换为 JSON_UNQUOTE(JSON_EXTRACT(...))：当你使用 ->> 运算符时，MySQL 内部实际上是将这个操作转换为 JSON_UNQUOTE(JSON_EXTRACT(...))。这是因为 ->> 本质上是提取 JSON 值并去引号的过程

JSON_UNQUOTE() 返回的值具有 LONGTEXT 数据类型：JSON_UNQUOTE() 函数提取出来的值会被视为 LONGTEXT 类型的数据。LONGTEXT 是 MySQL 中的一种文本数据类型，它可以存储大量的文本数据

MySQL 不能对没有键部分上的前缀长度指定的 LONGTEXT 列建立索引：这是 MySQL 的一个限制。由于 LONGTEXT 列可以存储非常大的数据，MySQL 不允许在没有指定键部分的前缀长度的情况下为这种类型的列创建索引。前缀长度是指只为列的一部分内容创建索引，而不是整个列的内容

在功能性键部分中又不允许指定前缀长度：这意味着当你尝试使用函数（如 JSON_UNQUOTE(JSON_EXTRACT(...))）作为索引的一部分时，你不能在这个函数内部指定前缀长度。这限制了为 JSON 列创建有效索引的能力

但是可以这样创建

```sql
CREATE INDEX idx_json_country_cast ON user_info((CAST(address->>"$.country" AS CHAR(30)) COLLATE utf8mb4_bin));

```

操作详解：

1. CREATE INDEX idx_json_country_cast: 这部分是创建索引的基本语法，idx_json_country_cast 是索引的名称
2. ON user_info: 这指定了索引将被创建在哪个表上，这里是 user_info 表
3. (CAST(address->>"$.country" AS CHAR(30)) COLLATE utf8mb4_bin): 这是索引的键定义部分，它告诉 MySQL 如何从表中提取数据以用于索引
   - address->>"$.country": 使用->>运算符从address列（假设它是一个JSON类型的列）中提取country字段的值。这个操作相当于JSON_UNQUOTE(JSON_EXTRACT(address, '$.country'))
   - CAST(... AS CHAR(30)): 使用 CAST 函数将提取出的 country 字段的值转换为 CHAR(30)类型，即最多 30 个字符的定长字符串。这样做是为了限制索引的大小，因为 country 字段的实际大小可能是可变的
   - COLLATE utf8mb4_bin: 这指定了字符串的排序规则（collation），utf8mb4_bin 是一种区分大小写和特殊字符的排序规则。这对于确保索引的正确性和一致性是很重要的

### 多值索引

多值索引是 MySQL 8.0.17 版本引入的新功能，它允许在 InnoDB 存储引擎中创建索引来支持对存储数组值的列进行高效查询。传统的索引是一对一的，而多值索引允许在一个数据记录上拥有多个索引记录。多值索引主要用于索引 JSON 数组

要创建多值索引，可以在 CREATE TABLE、ALTER TABLE 或 CREATE INDEX 语句中使用 CAST(… AS … ARRAY) 函数来定义。

这将把 JSON 数组中的同类型标量值转换为 SQL 数据类型数组。然后，MySQL 会在这个 SQL 数据类型数组上创建一个虚拟列，并在虚拟列上创建一个功能性索引。最终，这个功能性索引构成了多值索引

在 address 中增加一个 zipcode 列用于存储地址邮编，每个地址包含若干个邮编。我们对这个 zipcode 就可以使用多值索引

::: code-group

```sql [创建]
mysql> ALTER TABLE user_info ADD INDEX idx_json_zipcode((CAST(address->'$.zipcode' AS SIGNED ARRAY)));
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

```

```sql [验证]
mysql> SELECT * FROM user_info WHERE 94507 MEMBER OF(address->'$.zipcode');
+----+-----------+--------------------------------------------------------------------------------------------------+---------------------+
| id | user_name | address                                                                                          | create_time         |
+----+-----------+--------------------------------------------------------------------------------------------------+---------------------+
|  2 | lisi      | {"city": "shanghai", "street": "123 Main St", "country": "CN", "zipcode": [94568, 94507, 94582]} | 2024-02-05 11:08:22 |
|  3 | wangwu    | {"city": "guangzhou", "street": "123 Main St", "country": "CN", "zipcode": [94477, 94507]}       | 2024-02-05 11:08:22 |
|  4 | qianliu   | {"city": "New York", "street": "123 Main St", "country": "US", "zipcode": [94507, 94582]}        | 2024-02-05 11:08:22 |
+----+-----------+--------------------------------------------------------------------------------------------------+---------------------+
3 rows in set (0.01 sec)

mysql> EXPLAIN
    -> SELECT * FROM user_info WHERE 94507 MEMBER OF(address->'$.zipcode');
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys    | key              | key_len | ref   | rows | filtered | Extra       |
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------------+
|  1 | SIMPLE      | user_info | NULL       | ref  | idx_json_zipcode | idx_json_zipcode | 9       | const |    3 |   100.00 | Using where |
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------------+
1 row in set, 1 warning (0.00 sec)

```

:::

多值索引还可以作为复合索引的一部分进行定义。在复合索引中，只能有一个多值键部分，并且可以与其他单值部分一起使用。多值键部分可以按任意顺序使用

```sql
mysql> ALTER TABLE user_info ADD INDEX idx_name_zipcode(user_name, (CAST(address->'$.zipcode' AS SIGNED ARRAY)));
Query OK, 0 rows affected (0.04 sec)
Records: 0  Duplicates: 0  Warnings: 0

```

## 解惑

### -> 与 ->>

**-> 运算符**

当你使用 -> 运算符时，它会返回 JSON 格式的值。这意味着如果你从一个 JSON 对象中提取一个属性，你将得到一个 JSON 字符串，即使这个属性的值本身不是一个字符串

例如，如果你有一个 JSON 对象 {"name": "John"}，使用 -> 运算符提取 name 属性将返回 "John"（包括双引号），这是一个 JSON 字符串

语法示例：json_column -> '$.key'

**->> 运算符**

当你使用 ->> 运算符时，它会返回非 JSON 格式的值，也就是说，它会移除值的引号，将 JSON 字符串转换为普通字符串或相应的数据类型（如数字）

继续上面的例子，使用 ->> 运算符提取 name 属性将返回 John（不包括双引号），这是一个普通字符串

语法示例：json_column ->> '$.key'
