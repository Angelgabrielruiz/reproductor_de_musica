export {Node}
class Node {
    constructor(song) {
      this.song = song;
      this.next = null;
      this.prev = null;
    }
  }