const Node = require('./node');

class LinkedList {
    constructor() {
      this._head = this._tail = new Node();
      this.length = 0;
    }

    append(data) {
      var newNode = new Node(data);
      if(this.length === 0){
        this._head = newNode;
      }
      else{
        this._tail.next = newNode;
        newNode.prev = this._tail;
      }
      this._tail = newNode;
      this.length++;
      return this;
    }

    head() {
      return this._head.data;
    }

    tail() {
      return this._tail.data;
    }

    at(index) {
      if(index >= this.length || index < 0){
        return -1;
      }
      else {
        return this.getNodeAtIndex(index).data;
      }
    }

    insertAt(index, data) {
      if(index === 0){
        this.pushHead(data);
      }
      else if(index === this.length){
        this.append(data);
      }
      else{
        var oldAt = this.getNodeAtIndex(index);
        if(!!oldAt){
          var newNode = new Node(data,oldAt.prev,oldAt);
          oldAt.prev.next = newNode;
          oldAt.prev = newNode;
          this.length++;
        }
        else {
          return -1;
        }
      }
      return this;
    }

    isEmpty() {
      return this.length == 0;
    }

    clear() {
      this.length = 0;
      this._head = this._tail = new Node();
      return this;
    }

    deleteAt(index) {
      if(this.length < 2){
        this.clear();
        return this;
      }
      else if(index >= 0 && index < this.length ){
         var delNode = this.getNodeAtIndex(index);

         if(delNode.prev === null){
           this._head.prev = null;
           this._head = delNode.next;
         }
         else if(delNode.next === null){
           this._tail = delNode.prev;
           this._tail.next = null;
         }
         else{
           delNode.prev.next = delNode.next;
           delNode.next.prev = delNode.prev;
         }
         this.length--;
         return this;
      }
      else{
        return -1;
      }
    }

    reverse() {
      if(this.length>1){
        var currNode = this._head,
            turnNode = null;
        this._tail = this._head
        while(currNode){
          turnNode = currNode.prev;
          currNode.prev = currNode.next;
          currNode.next = turnNode;
          currNode = currNode.prev;
        }
        this._head = turnNode.prev;
      }

      return this;
    }

    indexOf(data) {
      var currNode = this._head;
      if(!this.isEmpty()){
        for (var pos=0; pos<this.length; pos++){
          if(currNode.data === data)
            return pos;
          currNode = currNode.next
        }
      }
      return -1;
    }

    getNodeAtIndex(index){
      var pos = 0,
        currNode = this._head;
      while (pos < index){
        currNode = currNode.next;
        pos++;
      }
      return currNode;
    }
    pushHead(data){
      var newNode = new Node(data,null,this._head);
      this._head.prev = newNode;
      this._head = newNode;
      this.length++;
      return this;
    }
}

module.exports = LinkedList;
