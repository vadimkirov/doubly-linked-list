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
    }

    head() {
        return this._head.data;
    }

    tail() {
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

        if (this._head === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        if (index === 0) {
            newNode.next = this._head;
            this._head.previous = newNode;
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
            current.previous.next = newNode;
            newNode.previous = current.previous;
            newNode.next = current;
            current.previous = newNode;
        }
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

            // store the data from the current head
            const data = this._head.data;

            // just replace the head with the next node in the list
            this._head = this._head.next;

            // there was only one node, so also reset `this[tail]`
            if (this._head === null) {
                this._tail = null;
            } else {
                this._head.previous = null;
            }

            // return the data at the previous head of the list
            return data;
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

            current.previous.next = current.next;

            // this is the last node so reset `this[tail]`.
            if (this._tail === current) {
                this._tail = current.previous;
            } else {
                current.next.previous = current.previous;
            }

            // return the value that was just removed from the list
            return current.data;
        }

        // if node wasn't found, throw an error
        throw new RangeError(`Index ${index} does not exist in the list.`);

    }

    reverse() {
        let currentNode = this._head(),
            length = this.length,
            count = 1,
            message1 = {failure: 'Failure: non-existent node in this list.'},
            message2 = {failure: 'Failure: this list contains ONE element'},
            temp = null;

        // 1-ый случай: список пуст или в нем одна позиция
        if (this.isEmpty()) {
            throw new Error(message1.failure);
        }

        if (length === 1){
            // throw new Error(message2.failure);
            return this;
        }

        // 2-ой случай: реверс
        while (count < this.length) {
            temp = currentNode.previous;
            currentNode.previous = currentNode.next;
            currentNode.next = temp;

            currentNode = currentNode.next;
            count++;
        }

        temp = this._head();
        this._head = this._tail();
        this._tail = temp;
        return this;
        // start by looking at the tail
        // let current = this._tail;
        //
        // // follow the previous links to the head
        // while (current !== null) {
        //     yield current.data;
        //     current = current.previous;
        // }
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

// list1 = new LinkedList();
// let aaaa = list1.isEmpty();
// list1.append(123);
// list1.append(413);
// console.log(list1.length);
// console.log(aaaa);
module.exports = LinkedList;
