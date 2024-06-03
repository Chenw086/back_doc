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
2. 必须只能包含 A-Z,a-z,0-9,\_ 共 63 个字符
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
除非使用所有数据，最好不要使用通配符 \*

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

查询 12 个月的工资总和，并起名 ANNUAL SALARY

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

查询 employees 表中去除重复的 job_id 以后的数据

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

查询员工号为 176 的员工的姓名和部门号

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

| 字段    | 说明                                                                                                                         |
| :------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Field   | 字段名称                                                                                                                     |
| Type    | 字段类型                                                                                                                     |
| Null    | 表示该列是否可以存储 Null 值                                                                                                 |
| Key     | 该列是否已编制索引。PRI 表示该列是表主键的一部分；UNI 表示该列是 UNIQUE 索引的一部分；MUL 表示在列中某个给定值允许出现多次。 |
| Default | 该列是否有默认值。若有，那么值是多少                                                                                         |
| Extra   | 可以获取的与给定列有关的附加信息。如：AUTO_INCREMENT                                                                         |

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

## 关联查询

### 笛卡尔积

笛卡尔乘积是一个数学运算

假设我有两个集合 X 和 Y，那么 X 和 Y 的笛卡尔积就是 X 和 Y 的所有可能组合，也就是第一个对象来自于 X，第二个对象来自于 Y 的所有可能。组合的个数即为两个集合中元素个数的乘积数

![01](./img/select/01.png)

SQL92 中，笛卡尔积也称为 交叉连接 ，英文是 CROSS JOIN 。

在 SQL99 中也是使用 CROSS JOIN 表示交叉连接。它的作用就是可以把任意表进行连接，即使这两张表不相关。

在以下情况的时候会出现笛卡尔积

```sql
-- 查询员工姓名和所在部门名称
SELECT last_name,department_name FROM employees,departments;
SELECT last_name,department_name FROM employees CROSS JOIN departments;
SELECT last_name,department_name FROM employees INNER JOIN departments;
SELECT last_name,department_name FROM employees JOIN departments;
```

解决方法就是添加连接条件

```sql
-- 案例：查询员工的姓名及其部门名称
SELECT last_name, department_name
FROM employees, departments
WHERE employees.department_id = departments.department_id;
```

::: danger 提示
在表中有相同列时，在列名之前加上表明前缀
:::

### (非)等值连接

```sql
SELECT employees.employee_id, employees.last_name,
employees.department_id, departments.department_id,
departments.location_id
FROM employees, departments
WHERE employees.department_id = departments.department_id;
```

**表的别名**

::: warning 提示

1. 多个表有相同列时，必须在列之前加上表名前缀
2. 在不同表中有相同列名的列可以用表名加以区分
3. 使用别名可以简化查询
4. 列名钱使用表明可以提高查询效率
5. 连接 N 个表，至少需要 n-1 个连接条件

需要注意的是：如果使用了表的别名，在查询字段中、过滤条件就只能使用别名进行替换，不能使用原有的表明，否则就会报错

:::

```sql
SELECT e.employee_id, e.last_name, e.department_id,
d.department_id, d.location_id
FROM employees e , departments d
WHERE e.department_id = d.department_id;
```

employees 表中的列工资在 job_grades 表中最高工资与最低工资之间

```sql
SELECT e.last_name, e.salary, j.grade_level
FROM employees e, job_grades j
WHERE e.salary BETWEEN j.lowest_sal AND j.highest_sal;
```

### (非)自连接

当 t1 与 t2 本质上是同一张表，只是利用取别名的方式虚拟成两张表以代表不同的意义

然后两张表再进行内连接，外连接等查询

```sql
SELECT CONCAT(worker.last_name ,' works for ', manager.last_name)
FROM employees worker, employees manager
WHERE worker.manager_id = manager.employee_id ;

+------------------------------------------------------------+
| CONCAT(worker.last_name ,' works for ', manager.last_name) |
+------------------------------------------------------------+
| Kochhar works for King                                     |
| De Haan works for King                                     |
| Hunold works for De Haan                                   |
| Ernst works for Hunold                                     |
| Austin works for Hunold                                    |
| Pataballa works for Hunold                                 |
| Lorentz works for Hunold                                   |
| Greenberg works for Kochhar                                |
| Faviet works for Greenberg                                 |
...
+------------------------------------------------------------+
106 rows in set (0.00 sec)

```

### [内|外]连接

内连接：结果集中不包含一个表与另一个表不匹配的行

外连接：除了匹配一个表与另一个表匹配的行以外，还返回左（或右）表中不满足条件的行 ，这种连接称为左（或右） 外连接。

如果是左外连接，则连接条件中左边的表成为主表，右边的表成为从表。

如果是右外连接，则连接条件中右边的表成为主表，左边的表成为从表。

**使用 + 创建连接**

在 SQL92 中采用（+）代表从表所在的位置。即左或右外连接中，(+) 表示哪个是从表

在 SQL92 中，只有左外连接和右外连接，没有满外连接

```sql
-- 左外连接
SELECT last_name,department_name
FROM employees ,departments
WHERE employees.department_id = departments.department_id(+);

-- 右外连接
SELECT last_name,department_name
FROM employees ,departments
WHERE employees.department_id(+) = departments.department_id;
```

### SQL99 实现

**基本语法**

- 可以使用 ON 子句制定额外的连接条件
- 这个连接条件是与其它条件分开的
- ON 子句使语句具有更高的易读性
- 关键字 JOIN、INNER JOIN、CROSS JOIN 含义是一样的，都表示内连接

::: code-group

```sql [语法]
SELECT table1.column, table2.column,table3.column
FROM table1
JOIN table2 ON table1 和 table2 的连接条件
JOIN table3 ON table2 和 table3 的连接条件
```

```bash [原理]
for t1 in table1:
    for t2 in table2:
        if condition1:
            for t3 in table3:
                if condition2:
                    output t1 + t2 + t3
```

:::

**内连接**

::: code-group

```bash [语法]
SELECT 字段列表
FROM A表 INNER JOIN B表
ON 关联条件
WHERE 等其他子句;
```

```sql [demo 1]
SELECT e.employee_id, e.last_name, e.department_id, d.department_id, d.location_id
FROM employees e JOIN departments d
ON (e.department_id = d.department_id);
```

```sql [demo 2]
SELECT employee_id, city, department_name
FROM employees e
JOIN departments d
ON d.department_id = e.department_id
JOIN locations l
ON d.location_id = l.location_id;
```

:::

**外连接**

::: danger 注意
LEFT JOIN 和 RIGHT JOIN 只存在于 SQL99 及以后的标准中，在 SQL92 中不存在，只能用 (+) 表示
:::

- 左外连接

::: code-group

```bash [语法]
SELECT 字段列表
FROM A表 LEFT JOIN B表
ON 关联条件
WHERE 等其他子句;
```

```bash [示例]
mysql> SELECT e.last_name, e.department_id, d.department_name
    -> FROM employees e
    -> LEFT OUTER JOIN departments d
    -> ON (e.department_id = d.department_id) ;
+-------------+---------------+------------------+
| last_name   | department_id | department_name  |
+-------------+---------------+------------------+
| King        |            90 | Executive        |
| Kochhar     |            90 | Executive        |
| De Haan     |            90 | Executive        |
| Hunold      |            60 | IT               |
| Ernst       |            60 | IT               |
| Austin      |            60 | IT               |
| Pataballa   |            60 | IT               |
| Lorentz     |            60 | IT               |
| Greenberg   |           100 | Finance          |
| Faviet      |           100 | Finance          |
| Chen        |           100 | Finance          |
...
| Grant       |          NULL | NULL             |
...
```

:::

- 右外连接

::: code-group

```bash [语法]
SELECT 字段列表
FROM A表 RIGHT JOIN B表
ON 关联条件
WHERE 等其他子句;
```

```bash [示例]
SELECT e.last_name, e.department_id, d.department_name
FROM employees e
RIGHT OUTER JOIN departments d
ON (e.department_id = d.department_id) ;
```

:::

**满外连接**

满外连接的结果 = 左右表匹配的数据 + 左表没有匹配到的数据 + 右表没有匹配到的数据

SQL99 是支持满外连接的。使用 FULL JOIN 或 FULL OUTER JOIN 来实现

需要注意的是，MySQL 不支持 FULL JOIN，但是可以用 LEFT JOIN UNION RIGHT join 代替
