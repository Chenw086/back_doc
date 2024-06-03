---
title: mysql - 查询
---

# 查询

::: danger 说明
SQL 语言在功能上主要分成三大类：

DDL（Data Definition Languages）：定义了不同的数据库、表、视图、索引等数据库对象，还可以用来创建、删除、修改数据表的结构

DML（Data Manipulation Language）：用于添加、删除、更新和查询数据库记录，并检查数据完整性

- 主要的雨具关键字包括：INSERT、DELETE、UPDATE、SELECT 等
- SELECT 是 SQL 语言的基础，最为重要

DCL（Data Control Language）：用于定义数据库、表、字段、用户的访问权限和安全级别

- 主要语句关键字包括：GRANT、REVOKE、ROLLBACK、SAVEPOINT 等

:::

## 规则与规范

**基本规范**

1. SQL 可以写在一行或者多行，为了提高可读性，各子句分行写，必要时使用缩进
2. 每条命令以 ; 或 \g 或 \G 结束
3. 关键字不能被缩写也不能分行
4. 关于标点符号
    - ()、''、""、是成对结束
    - 必须在英文状态的半角输入方式
    - 字符串型和日期时间类型可以使用单引号 '' 表示
    - 列的别名，尽量使用双引号 ""，而且不建议省略 as

**大小写规范**

`mysql` 在 `win` 环境下大小写不敏感

`mysql` 在 `linux` 环境下大小写敏感：

- 数据库名、表名、表的别名、变量名严格区分大小写

- 关键字、函数名、列名、列的别名（字段的别名）忽略大小写

推荐采用统一的书写规范：

- 数据库名、表名、表别名、字段名、字段别名都小写
- sql 关键字、函数名、标定变量等都大写

**注释**

```bash
单行注释：#注释文字(MySQL特有的方式)
单行注释：-- 注释文字(--后面必须包含一个空格。)
多行注释：/* 注释文字 */
```

**命名规则**

1. 数据库、表名不得超过 30 个字符，变量名限制为 29 个
2. 必须只能包含 A-Z,a-z,0-9,_ 共 63 个字符
3. 数据库名、表名、字段名等对象中间不要包含括号
4. 同一个 mysql 软件中，数据库不能同名；同库中表不能重名；同表中，同字段不能同名
5. 必须保证字段没有和保留字、数据库系统或常用方法冲突。坚持使用则使用 `` 引起来
6. 保持字段名和类型的一致性，在命名字段并为其指定数据的时候一定要保持一致性
   > 假如数据类型在一个表里是整数，在另一个表中就变成字符串了

**数据导入指令**

在命令行客户端登录 mysql，使用 source 指令导入

```shell
mysql> source d:\mysqldb.sql

mysql> use egg;
Database changed

mysql> desc employees;
+----------------+-------------+------+-----+---------+-------+
| Field          | Type        | Null | Key | Default | Extra |
+----------------+-------------+------+-----+---------+-------+
| employee_id    | int         | NO   | PRI | 0       |       |
| first_name     | varchar(20) | YES  |     | NULL    |       |
| last_name      | varchar(25) | NO   |     | NULL    |       |
| email          | varchar(25) | NO   | UNI | NULL    |       |
| phone_number   | varchar(20) | YES  |     | NULL    |       |
| hire_date      | date        | NO   |     | NULL    |       |
| job_id         | varchar(10) | NO   | MUL | NULL    |       |
| salary         | double(8,2) | YES  |     | NULL    |       |
| commission_pct | double(2,2) | YES  |     | NULL    |       |
| manager_id     | int         | YES  | MUL | NULL    |       |
| department_id  | int         | YES  | MUL | NULL    |       |
+----------------+-------------+------+-----+---------+-------+
11 rows in set (0.01 sec)
```

## 基本语法

::: danger
除非使用所有数据，最好不要使用通配符 *

因为这样会降低查询效率

:::

::: code-group

```sql [基本语法]
SELECT 标识选择哪些列
FROM 标识从哪个表中选择
```

```sql [查询全部列]
SELECT *
FROM departments;

mysql> select * from departments;
+---------------+----------------------+------------+-------------+
| department_id | department_name      | manager_id | location_id |
+---------------+----------------------+------------+-------------+
|            10 | Administration       |        200 |        1700 |
|            20 | Marketing            |        201 |        1800 |
|            30 | Purchasing           |        114 |        1700 |
|            40 | Human Resources      |        203 |        2400 |
|            50 | Shipping             |        121 |        1500 |
...
27 rows in set (0.00 sec)
```

:::

### 列的别名

1. 重命名一个列
2. 便于计算
3. 紧跟列名，也可以在列名和别名之间加入关键字 AS，别名使用双引号，以便在别名中包含空格或特殊的字符并区分大小写
4. AS 可以省略
5. 建议别名简短，见名知意

```bash
mysql> SELECT last_name AS name, commission_pct comm
    -> FROM employees;
+-------------+------+
| name        | comm |
+-------------+------+
| King        | NULL |
| Kochhar     | NULL |
| De Haan     | NULL |
...
```

### 去除重复行

默认情况下，查询会返回全部行，包括重复行

```bash
mysql> SELECT department_id
    -> FROM employees;
+---------------+
| department_id |
+---------------+
|          NULL |
|            10 |
|            20 |
|            20 |
|            30 |
|            30 |
|            30 |
...
+---------------+
107 rows in set (0.00 sec)
```

在 select 语句中使用关键字 DISTINCT 去除重复行

```bash
mysql> SELECT DISTINCT department_id
    -> FROM employees;
+---------------+
| department_id |
+---------------+
|          NULL |
|            10 |
|            20 |
|            30 |
|            40 |
|            50 |
|            60 |
|            70 |
|            80 |
|            90 |
|           100 |
|           110 |
+---------------+
12 rows in set (0.01 sec)
```

::: danger 注意点

1. DISTINCT 需要放到所有列名的前面，如果写成 SELECT salary,DISTINCT department_id FROM employees 会报错
2. DISTINCT 其实是对后面所有列名的组合进行去重

:::

正确应该写成：

```sql
SELECT DISTINCT department_id,salary
FROM employees;
```

### 空值运算

所有运算符或列值遇到 null 值，运算的结果都为 null

在 mysql 里面，空值不等于空字符串。

一个空字符串的长度是 0，而一个空值的长度是空，而且在 mysql 里面，空值是占用空间的。

```sql
SELECT employee_id,salary,commission_pct,
  12 * salary * (1 + commission_pct) "annual_sal"
FROM employees;
```

### 着重号

需要保证表中的字段、表名等没有和保留字、数据库系统或常用方法冲突

如果真的相同，在 SQL 中使用一对 `` 引起来

```bash
mysql> SELECT * FROM order;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'order' at line 1
```

正确的写法：

```bash
mysql> SELECT * FROM `order`;
+----------+------------+
| order_id | order_name |
+----------+------------+
|        1 | shkstart   |
|        2 | tomcat     |
|        3 | dubbo      |
+----------+------------+
3 rows in set (0.00 sec)
```

### 查询常数

SELECT 查询结果中增加一列固定的常数列，这列的取值是自定义的，而不是从表中取出来的

```sql
SELECT '尚硅谷' as corporation, last_name FROM employees;

mysql> SELECT '陈伟' as corporation, last_name FROM employees;
+-------------+-------------+
| corporation | last_name   |
+-------------+-------------+
| 陈伟        | King        |
| 陈伟        | Kochhar     |
| 陈伟        | De Haan     |
| 陈伟        | Hunold      |
| 陈伟        | Ernst       |
| 陈伟        | Austin      |
| 陈伟        | Pataballa   |
| 陈伟        | Lorentz     |
| 陈伟        | Greenberg   |
...
+-------------+-------------+
107 rows in set (0.00 sec)
```

### 练习

查询 12个月的工资总和，并起名 ANNUAL SALARY

```bash
mysql> SELECT employee_id,last_name,salary * 12 * (1 + IFNULL(commission_pct,0)) "ANNUAL
    "> SALARY"
    -> FROM employees;
+-------------+-------------+---------------+
| employee_id | last_name   | ANNUAL
SALARY |
+-------------+-------------+---------------+
|         100 | King        |     288000.00 |
|         101 | Kochhar     |     204000.00 |
|         102 | De Haan     |     204000.00 |
|         103 | Hunold      |     108000.00 |
|         104 | Ernst       |      72000.00 |
|         105 | Austin      |      57600.00 |
|         106 | Pataballa   |      57600.00 |
...
+-------------+-------------+---------------+
107 rows in set (0.01 sec)
```

查询employees表中去除重复的job_id以后的数据

```bash
mysql> SELECT DISTINCT job_id
    -> FROM employees;
+------------+
| job_id     |
+------------+
| AC_ACCOUNT |
| AC_MGR     |
...
| ST_MAN     |
+------------+
19 rows in set (0.01 sec)
```

查询工资大于 12000 员工姓名和工资

```bash
mysql> SELECT last_name, salary
    -> FROM employees
    -> WHERE salary > 12000;
+-----------+----------+
| last_name | salary   |
+-----------+----------+
| King      | 24000.00 |
| Kochhar   | 17000.00 |
| De Haan   | 17000.00 |
| Russell   | 14000.00 |
| Partners  | 13500.00 |
| Hartstein | 13000.00 |
+-----------+----------+
6 rows in set (0.00 sec)
```

查询员工号为176的员工的姓名和部门号

```bash
mysql> SELECT last_name, department_id
    -> FROM employees
    -> WHERE employee_id = 176;
+-----------+---------------+
| last_name | department_id |
+-----------+---------------+
| Taylor    |            80 |
+-----------+---------------+
1 row in set (0.01 sec)
```

显示表 departments 的结构，并查询其中的全部数据

```bash
mysql> DESC departments;
+-----------------+-------------+------+-----+---------+-------+
| Field           | Type        | Null | Key | Default | Extra |
+-----------------+-------------+------+-----+---------+-------+
| department_id   | int         | NO   | PRI | 0       |       |
| department_name | varchar(30) | NO   |     | NULL    |       |
| manager_id      | int         | YES  | MUL | NULL    |       |
| location_id     | int         | YES  | MUL | NULL    |       |
+-----------------+-------------+------+-----+---------+-------+
4 rows in set (0.01 sec)

# 查询所有
SELECT * FROM departments;
```

## 显示表结构

使用 DESCRIBE 或 DESC 命令，表示表结构

```sql
DESCRIBE employees;
-- 或
DESC employees;

mysql> DESC employees;
+----------------+-------------+------+-----+---------+-------+
| Field          | Type        | Null | Key | Default | Extra |
+----------------+-------------+------+-----+---------+-------+
| employee_id    | int         | NO   | PRI | 0       |       |
| first_name     | varchar(20) | YES  |     | NULL    |       |
| last_name      | varchar(25) | NO   |     | NULL    |       |
| email          | varchar(25) | NO   | UNI | NULL    |       |
| phone_number   | varchar(20) | YES  |     | NULL    |       |
| hire_date      | date        | NO   |     | NULL    |       |
| job_id         | varchar(10) | NO   | MUL | NULL    |       |
| salary         | double(8,2) | YES  |     | NULL    |       |
| commission_pct | double(2,2) | YES  |     | NULL    |       |
| manager_id     | int         | YES  | MUL | NULL    |       |
| department_id  | int         | YES  | MUL | NULL    |       |
+----------------+-------------+------+-----+---------+-------+
11 rows in set (0.00 sec)
```

|字段|说明|
|:--|--|
|Field|字段名称|
|Type|字段类型|
|Null|表示该列是否可以存储 Null 值|
|Key|该列是否已编制索引。PRI表示该列是表主键的一部分；UNI表示该列是UNIQUE索引的一部分；MUL表示在列中某个给定值允许出现多次。|
|Default|该列是否有默认值。若有，那么值是多少|
|Extra|可以获取的与给定列有关的附加信息。如：AUTO_INCREMENT|

## 过滤数据

::: code-group

```bash [语法]
SELECT 字段1,字段2
FROM 表名
WHERE 过滤条件
```

```bash [简单展示]
mysql> SELECT employee_id, last_name, job_id, department_id
    -> FROM employees
    -> WHERE department_id = 90 ;
+-------------+-----------+---------+---------------+
| employee_id | last_name | job_id  | department_id |
+-------------+-----------+---------+---------------+
|         100 | King      | AD_PRES |            90 |
|         101 | Kochhar   | AD_VP   |            90 |
|         102 | De Haan   | AD_VP   |            90 |
+-------------+-----------+---------+---------------+
3 rows in set (0.00 sec)
```

:::
