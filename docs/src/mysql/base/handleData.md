---
title: mysql - 数据增删改
---

# 数据增删改

查询内容太多了，在之前笔记都有记录

## 插入数据

### values 方式

**state 1:** 为表所有字段按默认顺序插入数据

::: code-group

```sql [语法]
INSERT INTO 表名
VALUES (value1,value2,....);
```

```sql [exam 1]
INSERT INTO departments
VALUES (70, 'Pub', 100, 1700);
```

```sql [exam 2]
INSERT INTO departments
VALUES (100, 'Finance', NULL, NULL);
```

:::

**state 2:** 为表指定字段插入数据

::: danger
为表的指定字段插入数据，就是在 INSERT 语句中只向部分字段中插入值，而其他字段的值为表定义时的默认值

在 INSERT 子句中随意列出列名，但是一旦列出，VALUES 中要插入的 value1,....valuen 需要与 column1,...columnn 列一一对应。如果类型不同，将无法插入，并且 MySQL 会产生错误
:::

::: code-group

```sql [语法]
INSERT INTO 表名(column1 [, column2, …, columnn])
VALUES (value1 [,value2, …, valuen]);
```

```sql [exam 1]
INSERT INTO departments(department_id, department_name)
VALUES (80, 'IT');
```

:::

**state 3:** 同时插入多条数据

::: info
使用 INSERT 同时插入多条记录时，MySQL 会返回一些在执行单行插入时没有的额外信息

- Records：表明插入的记录条数
- Duplicates：表明插入时被忽略的记录，原因可能是这些记录包含了重复的主键值
- Warnings：表明有问题的数据值，例如发生数据类型转换

一个同时插入多行记录的 INSERT 语句等同于多个单行插入的 INSERT 语句，但是多行的 INSERT 语句在处理过程中 `效率更高`

因为 MySQL 执行单条 INSERT 语句插入多行数据比使用多条 INSERT 语句快，所以在插入多条记录时最好选择使用单条 INSERT 语句的方式插入

另外：

- VALUES 也可以写成 VALUE ，但是 VALUES 是标准写法
- 字符和日期型数据应包含在单引号中

:::

::: code-group

```sql [语法]
INSERT INTO table_name
VALUES
(value1 [,value2, …, valuen]),
(value1 [,value2, …, valuen]),
……
(value1 [,value2, …, valuen]);
```

```sql [语法：指定插入]
INSERT INTO table_name(column1 [, column2, …, columnn])
VALUES
(value1 [,value2, …, valuen]),
(value1 [,value2, …, valuen]),
……
(value1 [,value2, …, valuen]);
```

```sql [exam]
mysql> INSERT INTO emp(emp_id,emp_name)
-> VALUES (1001,'demo'),
-> (1002,'test'),
-> (1003,'Tom');
Query OK, 3 rows affected (0.00 sec)
Records: 3 Duplicates: 0 Warnings: 0
```

:::

### 将查询结果插入

::: warning 注意
在 INSERT 中加入子查询

不必书写 VALUES 子句

子查询中的值列表应与 INSERT 子句中的列名对应

:::

::: code-group

```sql [语法]
INSERT INTO 目标表名
(tar_column1 [, tar_column2, …, tar_columnn])
SELECT
(src_column1 [, src_column2, …, src_columnn])
FROM 源表名
[WHERE condition]
```

```sql [exam 1]
INSERT INTO emp2
SELECT *
FROM employees
WHERE department_id = 90;
```

```sql [exam 2]
INSERT INTO sales_reps(id, name, salary, commission_pct)
SELECT employee_id, last_name, salary, commission_pct
FROM employees
WHERE job_id LIKE '%REP%';
```

:::

## 更新数据

可以一次性更新多条数据

如果需要回滚数据，需要保证在 DML 前，进行设置：SET AUTOCOMMIT = FALSE;

使用 WHERE 子句指定需要更新的数据

如果省略 WHERE 子句，则表中的所有数据都将被更新

::: code-group

```sql [语法]
UPDATE table_name
SET column1=value1, column2=value2, … , column=valuen
[WHERE condition]
```

```sql [有 WHERE]
UPDATE employees
SET department_id = 70
WHERE employee_id = 113;
```

```sql [没有 WHERE]
UPDATE copy_emp
SET department_id = 110;
```

:::

## 删除数据

指定 WHERE 指定条件删除，如果没有则删除表中所有记录

::: code-group

```sql [语法]
DELETE FROM table_name [WHERE <condition>];
```

```sql [删除所有]
DELETE FROM copy_emp;
```

```sql [删除指定]
DELETE FROM departments
WHERE department_name = 'Finance';
```

:::

## 计算列

在 MySQL 8.0 中，CREATE TABLE 和 ALTER TABLE 中都支持增加计算列。

::: warning 说明
VIRTUAL： 计算列的值在查询时动态计算，不占用额外存储空间，但可能有性能开销。适用于不需要索引和外键的场景

STORED：计算列的值存储在表中，占用额外存储空间，但查询性能可能更好。适用于需要索引和外键的场景

:::

::: code-group

```sql [创建表]
CREATE TABLE tb1(
  id INT,
  a INT,
  b INT,
  c INT GENERATED ALWAYS AS (a + b) VIRTUAL
);
```

```sql [插入数据]
INSERT INTO tb1(a,b) VALUES (100,200);
```

```sql [查询]
mysql> SELECT * FROM tb1;
+------+------+------+------+
| id | a | b | c |
+------+------+------+------+
| NULL | 100 | 200 | 300 |
+------+------+------+------+
1 row in set (0.00 sec)
```

```sql [更新数据]
mysql> UPDATE tb1 SET a = 500;
Query OK, 0 rows affected (0.00 sec)
Rows matched: 1 Changed: 0 Warnings: 0
```

:::
