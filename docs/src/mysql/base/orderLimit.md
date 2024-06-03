---
title: mysql - 排序与分页
---

# 排序与分页

::: danger
LIMIT 子句必须放在整个 SELECT 语句的最后
:::

## order

::: info
ASC：升序

DESC：降序

ORDER BY 子句在 SELECT 语句的结尾
:::

### 单列排序

::: code-group

```sql [升序]
SELECT
  last_name,
  job_id,
  department_id,
  hire_date
FROM
  employees
ORDER BY
  hire_date;
```

```sql [降序]
SELECT
  last_name,
  job_id,
  department_id,
  hire_date
FROM
  employees
ORDER BY
  hire_date DESC;
```

:::

### 多列排序

可以使用不在 select 列表中的列排序

在对多列进行排序的时候，首先排序的第一列必须有相同的列值，才会对第二列进行排序

如果第一列中所有值都是唯一的，将不再对第二列进行排序

```sql
SELECT last_name, department_id, salary
FROM employees
ORDER BY department_id, salary DESC;
```

## 分页

所谓分页显示，就是将数据库中的结果集，一段一段显示出来需要的条件

::: code-group

```bash [语法]
LIMIT [位置偏移量,] 行数

```

```sql [示例]
--前10条记录：
SELECT * FROM 表名 LIMIT 0,10;
-- 或者
SELECT * FROM 表名 LIMIT 10;

--第11至20条记录：
SELECT * FROM 表名 LIMIT 10,10;

--第21至30条记录：
SELECT * FROM 表名 LIMIT 20,10;
```

:::

::: warning mysql 8
MySQL 8.0 中可以使用“LIMIT 3 OFFSET 4”，意思是获取从第 5 条记录开始后面的 3 条记录，和"LIMIT4,3;"

返回的结果相同。
:::

::: code-group

```bash [分页公式]
分页显式公式：（当前页数-1）*每页条数，每页条数
```

```sql [语法展示]
SELECT * FROM table
LIMIT(PageNo - 1)*PageSize,PageSize;
```

:::

## 练习

查询员工的姓名和部门号和年薪，按年薪降序 按姓名升序显示

```sql
SELECT last_name,department_id,salary * 12 annual_sal
FROM employees
ORDER BY annual_sal DESC,last_name ASC;
```

选择工资不在 8000 到 17000 的员工的姓名和工资，按工资降序，显示第 21 到 40 位置的数据

```sql
SELECT last_name,salary
FROM employees
WHERE salary NOT BETWEEN 8000 AND 17000
ORDER BY salary DESC
LIMIT 20,20;
```

查询邮箱中包含 e 的员工信息，并按照邮箱字节数降序，再按部门号升序

```sql
SELECT last_name,email,department_id
FROM employees
-- where email like '%e%'
WHERE email REGEXP '[e]'
ORDER BY LENGTH(email) DESC,department_id ASC;
```
