---
title: mysql - 创建和管理表
---

# 创建和管理表

**MySql 中的数据类型**

| 类型             | 类型举例                                                                                                        |
| :--------------- | --------------------------------------------------------------------------------------------------------------- |
| 整数类型         | TINYINT、SMALLINT、MEDIUMINT、INT(或 INTEGER)、BIGINT                                                           |
| 浮点类型         | FLOAT、DOUBLE                                                                                                   |
| 定点数类型       | DECIMAL                                                                                                         |
| 位类型           | BIT                                                                                                             |
| 日期时间类型     | YEAR、TIME、DATE、DATETIME、TIMESTAMP                                                                           |
| 文本字符串类型   | CHAR、VARCHAR、TINYTEXT、TEXT、MEDIUMTEXT、LONGTEXT                                                             |
| 枚举类型         | ENUM                                                                                                            |
| 集合类型         | SET                                                                                                             |
| 二进制字符串类型 | BINARY、VARBINARY、TINYBLOB、BLOB、MEDIUMBLOB、LONGBLOB                                                         |
| JSON 类型        | JSON 对象、JSON 数组                                                                                            |
| 空间数据类型     | 单值：GEOMETRY、POINT、LINESTRING、POLYGON；集合：MULTIPOINT、MULTILINESTRING、MULTIPOLYGON、GEOMETRYCOLLECTION |

**常用类型**

| 数据类型      | 描述                                                                               |
| :------------ | ---------------------------------------------------------------------------------- |
| INT           | 从-2^31 到 2^31-1 的整型数据。存储大小为 4 个字节                                  |
| CHAR(size)    | 定长字符数据。若未指定，默认为 1 个字符，最大长度 255                              |
| VARCHAR(size) | 可变长字符数据，根据字符串实际长度保存，必须指定长度                               |
| FLOAT(M,D)    | 单精度，占用 4 个字节，M=整数位+小数位，D=小数位。 D<=M<=255,0<=D<=30，默认 M+D<=6 |
| DOUBLE(M,D)   | 双精度，占用 8 个字节，D<=M<=255,0<=D<=30，默认 M+D<=15                            |
| DECIMAL(M,D)  | 高精度小数，占用 M+2 个字节，D<=M<=65，0<=D<=30，最大取值范围与 DOUBLE 相同。      |
| DATE          | 日期型数据，格式'YYYY-MM-DD'                                                       |
| BLOB          | 二进制形式的长文本数据，最大可达 4G                                                |
| TEXT          | 长文本数据，最大可达 4G                                                            |

## 创建管理数据库

**创建数据库**

::: info
DATABASE 不能改名，一些可视化工具可以修改，但只是新建库，把所有表复制到新库，再删除旧库完成的
:::

最好是进行判断再创建，如果存在就忽略创建语句，不再创建数据库

::: code-group

```sql [创建]
CREATE DATABASE 数据库名;
```

```sql [并指定字符集]
CREATE DATABASE 数据库名 CHARACTER SET 字符集;
```

```sql [判断是否存在]
CREATE DATABASE IF NOT EXISTS 数据库名;

```

:::

**使用数据库**

::: danger 提示
要操作表格和数据库之前必须先说明是对哪个数据库进行操作，否则就要对所有对象加上 `数据库名`
:::

::: code-group

```sql [使用/切换]
USE 数据库名;
```

```sql [查看所有数据库]
SHOW DATABASES;
```

```sql [当前使用数据库]
SELECT DATABASE();
```

```sql [查看库下所有表]
SHOW TABLES FROM 数据库名;
```

```sql [查看库创建信息]
SHOW CREATE DATABASE 数据库名;
```

:::

**修改数据库**

更新数据库字符

```sql
ALTER DATABASE 数据库名 CHARACTER SET 字符集;

-- 比如：gbk、utf8等
```

**删除数据库**

::: code-group

```sql [删除指定数据库并判断]
DROP DATABASE IF EXISTS 数据库名;
```

```sql [删除指定数据库]
DROP DATABASE 数据库名;
```

:::

## 创建表

**创建方式 1**

::: code-group

```sql [语法]
CREATE TABLE [IF NOT EXISTS] 表名(
  字段1, 数据类型 [约束条件] [默认值],
  字段2, 数据类型 [约束条件] [默认值],
  字段3, 数据类型 [约束条件] [默认值],
  ……
  [表约束条件]
);
```

```sql [示例1]
CREATE TABLE emp (
  -- int类型
  emp_id INT,
  -- 最多保存20个中英文字符
  emp_name VARCHAR(20),
  -- 总位数不超过15位
  salary DOUBLE,
  -- 日期类型
  birthday DATE
);
```

```sql [查看表1结构]
mysql> DESC emp;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| emp_id   | int         | YES  |     | NULL    |       |
| emp_name | varchar(20) | YES  |     | NULL    |       |
| salary   | double      | YES  |     | NULL    |       |
| birthday | date        | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)


```

```sql [示例2]
CREATE TABLE dept(
  -- int类型，自增
  deptno INT(2) AUTO_INCREMENT,
  dname VARCHAR(14),
  loc VARCHAR(13),
  -- 主键
  PRIMARY KEY (deptno)
);
```

```sql [查看表2结构]
mysql> DESCRIBE dept;
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| deptno | int         | NO   | PRI | NULL    | auto_increment |
| dname  | varchar(14) | YES  |     | NULL    |                |
| loc    | varchar(13) | YES  |     | NULL    |                |
+--------+-------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```

:::

**创建方式 2**

::: info

- 将创建表和插入数据结合起来
- 指定的列和子查询中的列要一一对应
- 通过列名和默认值定义列
- 这样创建把索引给干掉了

:::

::: code-group

```sql [语法]
CREATE TABLE table
  [(column, column)]
AS subQuery;
```

```sql [示例1]
CREATE TABLE emp1 AS SELECT * FROM employees;

CREATE TABLE emp2 AS SELECT * FROM employees WHERE 1=2; -- 创建的emp2是空表
```

```sql [查看结构]
DESC emp1;

mysql> DESC emp1;
+----------------+-------------+------+-----+---------+-------+
| Field          | Type        | Null | Key | Default | Extra |
+----------------+-------------+------+-----+---------+-------+
| employee_id    | int         | NO   |     | 0       |       |
| first_name     | varchar(20) | YES  |     | NULL    |       |
| last_name      | varchar(25) | NO   |     | NULL    |       |
| email          | varchar(25) | NO   |     | NULL    |       |
| phone_number   | varchar(20) | YES  |     | NULL    |       |
| hire_date      | date        | NO   |     | NULL    |       |
| job_id         | varchar(10) | NO   |     | NULL    |       |
| salary         | double(8,2) | YES  |     | NULL    |       |
| commission_pct | double(2,2) | YES  |     | NULL    |       |
| manager_id     | int         | YES  |     | NULL    |       |
| department_id  | int         | YES  |     | NULL    |       |
+----------------+-------------+------+-----+---------+-------+
11 rows in set (0.00 sec)


DESC emp2;

mysql> DESC emp2;
+----------------+-------------+------+-----+---------+-------+
| Field          | Type        | Null | Key | Default | Extra |
+----------------+-------------+------+-----+---------+-------+
| employee_id    | int         | NO   |     | 0       |       |
| first_name     | varchar(20) | YES  |     | NULL    |       |
| last_name      | varchar(25) | NO   |     | NULL    |       |
| email          | varchar(25) | NO   |     | NULL    |       |
| phone_number   | varchar(20) | YES  |     | NULL    |       |
| hire_date      | date        | NO   |     | NULL    |       |
| job_id         | varchar(10) | NO   |     | NULL    |       |
| salary         | double(8,2) | YES  |     | NULL    |       |
| commission_pct | double(2,2) | YES  |     | NULL    |       |
| manager_id     | int         | YES  |     | NULL    |       |
| department_id  | int         | YES  |     | NULL    |       |
+----------------+-------------+------+-----+---------+-------+
11 rows in set (0.00 sec)

```

```sql [示例2]
CREATE TABLE dept80
AS
SELECT employee_id, last_name, salary*12 ANNSAL, hire_date
FROM employees
WHERE department_id = 80;
```

```sql [查看结构]
mysql> DESC dept80;
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| employee_id | int          | NO   |     | 0       |       |
| last_name   | varchar(25)  | NO   |     | NULL    |       |
| ANNSAL      | double(22,2) | YES  |     | NULL    |       |
| hire_date   | date         | NO   |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+
4 rows in set (0.00 sec)

```

:::

**查看表结构**

使用 SHOW CREATE TABLE 语句不仅可以查看表创建时的详细语句，还可以查看存储引擎和字符编码

::: code-group

```sql [方式 1]
DESC 表名;
```

```sql [方式 2]
SHOW CREATE TABLE 表名;
```

:::

## 修改表

使用 ALTER TABLE 语句可以实现：

- 向已有的表中添加列
- 修改现有表中的列
- 删除现有表中的列
- 重命名现有表中的列

### 追加列

::: code-group

```sql [语法]
ALTER TABLE 表名 ADD 【COLUMN】 字段名 字段类型 【FIRST|AFTER 字段名】;
```

```sql [示例]
ALTER TABLE dept80
ADD job_id varchar(15);
```

```sql [查看]
mysql> desc dept80;
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| employee_id | int          | NO   |     | 0       |       |
| last_name   | varchar(25)  | NO   |     | NULL    |       |
| ANNSAL      | double(22,2) | YES  |     | NULL    |       |
| hire_date   | date         | NO   |     | NULL    |       |
| job_id      | varchar(15)  | YES  |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+
5 rows in set (0.01 sec)

```

:::

### 修改列

::: info

- 可以修改列的数据类型、长度、默认值和位置
- 对默认值的修改只影响今后对表的修改
- 还可以通过这种方式修改列的约束

:::

::: code-group

```sql [语法]
ALTER TABLE 表名 MODIFY 【COLUMN】 字段名1 字段类型 【DEFAULT 默认值】【FIRST|AFTER 字段名2】;
```

```sql [示例]
ALTER TABLE dept80
MODIFY last_name VARCHAR(30);
```

```sql [示例]
ALTER TABLE dept80
MODIFY salary double(9,2) default 1000;
```

```sql [查看结构]
mysql> DESC dept80;
+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| employee_id | int         | NO   |     | 0       |       |
| last_name   | varchar(30) | YES  |     | NULL    |       |
| ANNSAL      | double(9,2) | YES  |     | 1000.00 |       |
| hire_date   | date        | NO   |     | NULL    |       |
| job_id      | varchar(15) | YES  |     | NULL    |       |
+-------------+-------------+------+-----+---------+-------+
5 rows in set (0.00 sec)

```

:::

### 重命名列

::: code-group

```sql [语法]
ALTER TABLE 表名 CHANGE 【column】 列名 新列名 新数据类型;
```

```sql [示例]
ALTER TABLE dept80
ADD department_name varchar(15);

ALTER TABLE dept80
CHANGE department_name dept_name  varchar(15);
```

```sql [查看结构]
mysql> DESC dept80;
+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| employee_id | int         | NO   |     | 0       |       |
| last_name   | varchar(30) | YES  |     | NULL    |       |
| ANNSAL      | double(9,2) | YES  |     | 1000.00 |       |
| hire_date   | date        | NO   |     | NULL    |       |
| job_id      | varchar(15) | YES  |     | NULL    |       |
| dept_name   | varchar(15) | YES  |     | NULL    |       |
+-------------+-------------+------+-----+---------+-------+
6 rows in set (0.00 sec)

```

:::

### 删除列

::: code-group

```sql [语法]
ALTER TABLE 表名 DROP 【COLUMN】字段名;
```

```sql [示例]
ALTER TABLE dept80
DROP COLUMN job_id;
```

```sql [查看结构]
mysql> DESC dept80;
+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| employee_id | int         | NO   |     | 0       |       |
| last_name   | varchar(30) | YES  |     | NULL    |       |
| ANNSAL      | double(9,2) | YES  |     | 1000.00 |       |
| hire_date   | date        | NO   |     | NULL    |       |
| dept_name   | varchar(15) | YES  |     | NULL    |       |
+-------------+-------------+------+-----+---------+-------+
5 rows in set (0.00 sec)

```

:::

## 重命名表

::: code-group

```sql [方式 1]
RENAME TABLE emp
TO myemp;
```

```sql [方式 2]
ALTER table dept
RENAME [TO] detail_dept;
```

```sql [查看所有表]
mysql> SHOW TABLES;
+-------------------+
| Tables_in_chenwei |
+-------------------+
| countries         |
| departments       |
| dept80            |
| detail_dept       |
| emp1              |
| emp2              |
| emp_details_view  |
| employees         |
| job_grades        |
| job_history       |
| jobs              |
| locations         |
| myemp             |
| order             |
| regions           |
+-------------------+
15 rows in set (0.00 sec)

```

:::

## 删除表

::: info

- 在 MySQL 中，当一张数据表 `没有与其他任何数据表形成关联关系` 时，可以将当前数据表直接删除
- 数据和结构都被删除
- 所有正在运行的相关事务被提交
- 所有相关索引被删除
- DROP TABLE 语句不能回滚

:::

::: code-group

```sql [语法]
DROP TABLE [IF EXISTS] 数据表1 [, 数据表2, …, 数据表n];
```

```sql [示例]
DROP TABLE dept80;
```

```sql [查看所有表]
mysql> SHOW TABLES;
+-------------------+
| Tables_in_chenwei |
+-------------------+
| countries         |
| departments       |
| detail_dept       |
| emp1              |
| emp2              |
| emp_details_view  |
| employees         |
| job_grades        |
| job_history       |
| jobs              |
| locations         |
| myemp             |
| order             |
| regions           |
+-------------------+
14 rows in set (0.00 sec)
```

:::

## 清空表

:::info 规范
TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少，但 TRUNCATE 无事务且不触发 TRIGGER，有可能造成事故，故不建议在开发代码中使用此语句。

TRUNCATE TABLE 在功能上与不带 WHERE 子句的 DELETE 语句相同
:::

**TRUNCATE TABLE**

- 删除表中所有的数据
- 释放表的存储空间
- 不能回滚，但 DELETE 删除的数据，可以回滚

::: code-group

```sql [TRUNCATE]
TRUNCATE TABLE emp2;
```

```sql [DELETE 并回滚]
SET autocommit = FALSE;
DELETE FROM emp2;
SELECT * FROM emp2;
ROLLBACK;
SELECT * FROM emp2;
```

:::
