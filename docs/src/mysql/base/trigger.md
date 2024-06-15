---
title: mysql - 触发器
---

# 触发器

::: warning 优缺点

**优点：**

1. 触发器可以确保数据的完整性
2. 触发器可以帮助我们记录操作日志
3. 触发器还可以用在操作数据前，对数据进行合法性检查

**缺点：**

1. 触发器最大的一个问题就是可读性差
2. 相关数据的变更，可能会导致触发器出错

:::

::: danger
注意，如果在子表中定义了外键约束，并且外键指定了 ON UPDATE/DELETE CASCADE/SET NULL 子句，此时修改父表被引用的键值或删除父表被引用的记录行时，也会引起子表的修改和删除操作，此时基于子表的 UPDATE 和 DELETE 语句定义的触发器并不会被激活
:::

产生场景：如 商品信息 和 库存信息 分别存放在 2 个不同的数据表中，我们在添加一条新商品记录的时候，为了保证数据的完整性，必须同时在库存表中添加一条库存记录

这样一来，我们就必须把这两个关联的操作步骤写到程序里面，而且要用 事务 包裹起来，确保这两个操作成为一个 原子操作 ，要么全部执行，要么全部不执行。要是遇到特殊情况，可能还需要对数据进行手动维护，这样就很 容易忘记其中的一步 ，导致数据缺失

这个时候，咱们可以使用触发器。你可以创建一个触发器，让商品信息数据的插入操作自动触发库存数据的插入操作。这样一来，就不用担心因为忘记添加库存数据而导致的数据缺失了

## 创建

```sql
CREATE TRIGGER 触发器名称
{BEFORE|AFTER} {INSERT|UPDATE|DELETE} ON 表名
FOR EACH ROW
触发器执行的语句块;

```

**说明**

- 表名：表示触发器监控的对象
- BEFORE|AFTER ：表示触发的时间。BEFORE 表示在事件之前触发；AFTER 表示在事件之后触发
- INSERT|UPDATE|DELETE ：表示触发的事件
  - INSERT 表示插入记录时触发
  - UPDATE 表示更新记录时触发
  - DELETE 表示删除记录时触发
- 触发器执行的语句块 ：可以是单条 SQL 语句，也可以是由 BEGIN…END 结构组成的复合语句块

**示例：**

创建名称为 after_insert 的触发器，向 test_trigger 数据表插入数据之后，向 test_trigger_log 数据表中插入 after_insert 的日志信息

::: code-group

```sql [建表]
CREATE TABLE test_trigger (
  id INT PRIMARY KEY AUTO_INCREMENT,
  t_note VARCHAR(30)
);
CREATE TABLE test_trigger_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  t_log VARCHAR(30)
  );
```

```sql [创建触发器]
-- 创建名称为before_insert的触发器，向test_trigger数据表插入数据之前，向test_trigger_log数据表中插入before_insert的日志信息

DELIMITER //
CREATE TRIGGER before_insert
BEFORE INSERT ON test_trigger
FOR EACH ROW
BEGIN
  INSERT INTO test_trigger_log (t_log)
  VALUES('before_insert');
END //
DELIMITER ;
```

```sql [插入数据]
INSERT INTO test_trigger (t_note) VALUES ('测试 BEFORE INSERT 触发器');
```

```sql [查看trigger数据]
mysql>  SELECT * FROM test_trigger_log;
+----+---------------+
| id | t_log         |
+----+---------------+
|  1 | before_insert |
+----+---------------+
1 row in set (0.00 sec)
```

:::

定义触发器“salary_check_trigger”，基于员工表“employees”的 INSERT 事件，在 INSERT 之前检查将要添加的新员工薪资是否大于他领导的薪资，如果大于领导薪资，则报 sqlstate_value 为'HY000'的错误，从而使得添加失败

::: code-group

```sql [定义]
DELIMITER //
CREATE TRIGGER salary_check_trigger
BEFORE INSERT ON employees FOR EACH ROW
  BEGIN
    DECLARE mgrsalary DOUBLE;
    SELECT salary INTO mgrsalary FROM employees WHERE employee_id = NEW.manager_id;
    IF NEW.salary > mgrsalary THEN
      SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT = '薪资高于领导薪资错误';
    END IF;
  END //
DELIMITER ;
```

:::

## 查看触发器

::: code-group

```sql [way 1]
SHOW TRIGGERS;
```

```sql [way 2]
SHOW CREATE TRIGGER 触发器名;
```

```sql [way 3]
SELECT * FROM information_schema.TRIGGERS;
```

:::

## 删除触发器

触发器也是数据库对象，删除触发器也用 DROP 语句

```sql
DROP TRIGGER IF EXISTS 触发器名称;
```
