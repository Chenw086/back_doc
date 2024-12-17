/*  
    单向链表实现队列
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
  add(index, element) {
    if (arguments.length === 1) {
      element = index;
      index = this.size;
    }
    if (index < 0 || index > this.size) {
      new Error("越界了");
    }
    if (index === 0) {
      let head = this.head;
      this.head = new Node(element, head);
    } else {
      let prevNode = this._getNode(index - 1);
      prevNode.next = new Node(element, prevNode.next);
    }
    this.size++;
  }
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
    let reNode = null;
    if (index === 0) {
      reNode = this.head;
      if (!reNode) {
        return undefined;
      }
      this.head = reNode.next;
    } else {
      let prevNode = this._getNode(index - 1);
      reNode = prevNode.next;
      prevNode.next = prevNode.next.next;
    }
    this.size--;
    return reNode;
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

class Queue {
  constructor() {
    this.LinkedList = new LinkedList();
  }
  enQueue(data) {
    this.LinkedList.add(data);
  }
  deQueue() {
    return this.LinkedList.remove(0);
  }
}

module.exports = Queue;
