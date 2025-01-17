const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        const newNode = new Node(data);

        if (this._head === null) {
            this._head = newNode;
        } else {
            this._tail.next = newNode;
            newNode.prev = this._tail;
        }

        this._tail = newNode;
        this.length++;
        return this;
    }

    head() {
        if(this._head === null) return null;
        return this._head.data;
    }

    tail() {
        if(this._tail === null) return null;
        return this._tail.data;
    }

    at(index) {

        if (index > -1) {
            let current = this._head;
            let i = 0;
            while ((current !== null) && (i < index)) {
                current = current.next;
                i++;
            }

            return current !== null ? current.data : undefined;
        } else {
            return undefined;
        }
    }

    insertAt(index, data) {
        const newNode = new Node(data);

        if (this._head === null && index !== 0) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        if (this._head === null && index === 0){
            this.append(data);
            return this;
        }
        if (index === 0) {
            newNode.next = this._head;
            this._head.prev = newNode;
            this._head = newNode;
        } else {
            let current = this._head;
            let i = 0;
            while ((current.next !== null) && (i < index)) {
                current = current.next;
                i++;
            }
            if (i < index) {
                throw new RangeError(`Index ${index} does not exist in the list.`);
            }
            current.prev.next = newNode;
            newNode.prev = current.prev;
            newNode.next = current;
            current.prev = newNode;
        }

        return this;
    }

    isEmpty() {
        return (this.length === 0 && this._head === null && this._tail === null);
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;


    }

    deleteAt(index) {
        // no nodes in the list or `index` is negative
        if ((this._head === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        //  removing the first node
        if (index === 0) {


            // just replace the head with the next node in the list
            this._head = this._head.next;

            // there was only one node, so also reset `this._tail`
            if (this._head === null) {
                this._tail = null;
            } else {
                this._head.prev = null;
            }

            return this;
        }

        // pointer use to traverse the list
        let current = this._head;

        let i = 0;

        while ((current !== null) && (i < index)) {

            // traverse to the next node
            current = current.next;

            i++;
        }

        // if node was found, remove it
        if (current !== null) {

            current.prev.next = current.next;

            // this is the last node so reset `this._tail`.
            if (this._tail === current) {
                this._tail = current.prev;
            } else {
                current.next.prev = current.prev;
            }

            return this;
        }

        // if node wasn't found, throw an error
        throw new RangeError(`Index ${index} does not exist in the list.`);

    }

    reverse() {
        let currentNode = this._head,
            length = this.length,
            i = 1,
            message1 = {failure: 'Failure: non-existent node in this list.'},
            temp = null;

        // 1-ый случай: список пуст или в нем одна позиция
        if (this.isEmpty()) {
            throw new Error(message1.failure);
        }

        if (length === 1){

            return this;
        }

        // 2-ой случай: реверс
        while (i < this.length) {
            temp = currentNode.prev;
            currentNode.prev = currentNode.next;
            let nextItem = currentNode.next;
            currentNode.next = temp;

            currentNode = nextItem;
            i++;
        }

        temp = this._head;
        this._head = this._tail;
        this._head.next = this._head.prev;
        this._head.prev = null;
        this._tail = temp;

        return this;

    }

    indexOf(data) {
        let current = this._head;
        let index = 0;
        while (current !== null) {
            if (current.data === data) {
                return index;
            }

            // traverse to the next node in the list
            current = current.next;

            // keep track of where we are
            index++;
        }

        return -1;
    }
}


module.exports = LinkedList;
