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
