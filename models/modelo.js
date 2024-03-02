import { Node } from "../models/Node.js";

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(song) {
    const newNode = new Node(song);
    if (!this.head) {
      this.head = newNode;
      this.head.next = this.head;
      this.head.prev = this.head;
    } else {
      const tail = this.head.prev;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.size++;
  }

  getCurrentSong() {
    return this.head ? this.head.song : null;
  }

  getNextSong() {
    if (this.head) {
      this.head = this.head.next;
      return this.head.song;
    }
    return null;
  }

  getPrevSong() {
    if (this.head) {
      this.head = this.head.prev;
      return this.head.song;
    }
    return null;
  }
}

export { Node, LinkedList };
