class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    append(value) {
        const newNode = new Node(value);

        if (this.head == null) {
            this.head = newNode;
        } else if (this.tail == null) {
            this.tail = newNode;
            this.head.nextNode = newNode;
        } else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    prepend(value) {
        const newNode = new Node(value);

        if (this.head == null) {
            this.head = newNode;
        } else if (this.tail == null) {
            newNode.nextNode = this.head;
            this.tail = this.head;
            this.head = newNode;
        } else {
            newNode.nextNode = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    getNode(index) {
        if (this.size != 0) {
            if (0 < index + 1 && index + 1 <= this.size) {
                let currentNode = this.head;
                let i = 0;

                while (currentNode != null) {
                    if (i == index) {
                        return currentNode;
                    }
                    i++;
                    currentNode = currentNode.nextNode;
                }
            } else {
                return console.log("Index out of range.");
            }
        } else {
            return console.log("List is empty.");
        }
    }

    pop() {
        if (this.head == null) {
            return console.log("List is empty.");
        } else if (this.tail == null) {
            this.head = null;
            this.size--;
        } else {
            let currentNode = this.head;
            let secondToLastNode;

            while (currentNode.nextNode) {
                secondToLastNode = currentNode;
                currentNode = currentNode.nextNode;
            }

            secondToLastNode.nextNode = null;
            this.tail = secondToLastNode;
            this.size--;
        }
    }

    contains(value) {
        let current = this.head;

        while (current) {
            if (current.value == value) {
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.value == value) {
                return index;
            }
            current = current.nextNode;
            index++;
        }
        return null;
    }

    printList() {
        let current = this.head;
        let str = "";
        while (current) {
            str += `(${current.value}) -> `;
            current = current.nextNode;
        }
        str += "NULL";
        console.log(str);
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

linkedList = new LinkedList();
linkedList.getNode(0);
linkedList.append("1");
linkedList.append("2");
linkedList.append("3");
linkedList.printList();
console.log(linkedList.getNode(0));
console.log(linkedList.getNode(1));
linkedList.getNode(-1);
linkedList.getNode(10);
linkedList.pop();
linkedList.printList();
console.log(linkedList.contains("1"));
console.log(linkedList.contains("10"));
console.log(linkedList.find("2"));
console.log(linkedList.find("10"));
