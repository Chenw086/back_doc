/*  
    数组缺点：
        数组存储数据的长度具有上限。
        数组存在坍塌问题。

    链表结构组成：
        1. node + head + null
        2. size 链表节点的个数
        3. next 指向下一个 node 节点
        4. 增删改查情况相应的实现
*/

class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = null;
    this.size = 0;
  }

  /**
   * 往指定位置添加内容,
   * 如果只传递一个参数那么往末尾位置添加
   * @param { number } index - 索引位置
   * @param { string } [element] - 添加的内容
   */
  add(index, element) {
    if (arguments.length === 1) {
      element = index;
      index = this.size;
    }
    if (index < 0 || index > this.size) {
      new Error("越界了");
    }
    if (index === 0) {
      let head = this.head; // 保存原有 head 的指向
      this.head = new Node(element, head);
    } else {
      let prevNode = this._getNode(index - 1);
      prevNode.next = new Node(element, prevNode.next);
    }
    this.size++;
  }

  /**
   * 传入索引得到位置上的值, index 为 0 的位置是 head, 0 上的值是 head.next
   * @param { Number } index
   * @returns { Node } 返回当前索引位置上的值
   */
  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("越界了");
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  remove(index) {
    if (index === 0) {
      let head = this.head;
      this.head = head.next;
    } else {
      let prevNode = this._getNode(index - 1);
      prevNode.next = prevNode.next.next;
    }
    this.size--;
  }

  set(index, element) {
    let node = this._getNode(index);
    node.element = element;
  }

  get(index) {
    return this._getNode(index);
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
}

const l1 = new LinkedList();
l1.add("node1");
l1.add("node2");
l1.add("node3");
l1.remove(1);
console.log(l1);
