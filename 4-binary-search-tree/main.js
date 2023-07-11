import { mergeSort } from "../2-mergesort/main.js";
import { prettyPrint } from "./prettyPrint.js";

class Node {
    constructor(value) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    sortArray(array) {
        array = mergeSort(array);
        return [...new Set(array)];
    }

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        } else {
            let middle = parseInt((start + end) / 2);
            const newNode = new Node(array[middle]);

            if (this.root == null) {
                this.root = newNode;
            }

            newNode.leftChild = this.buildTree(array, start, middle - 1);
            newNode.rightChild = this.buildTree(array, middle + 1, end);
            return newNode;
        }
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root == null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(currentNode, newNode) {
        if (newNode.value < currentNode.value) {
            if (currentNode.leftChild === null) {
                currentNode.leftChild = newNode;
            } else {
                this.insertNode(currentNode.leftChild, newNode);
            }
        } else {
            if (currentNode.rightChild === null) {
                currentNode.rightChild = newNode;
            } else {
                this.insertNode(currentNode.rightChild, newNode);
            }
        }
    }

    delete(value) {
        this.root = this.deleteNode(value, this.root);
    }

    deleteNode(value, currentNode) {
        if (currentNode == null) {
            return null;
        } else if (value < currentNode.value) {
            currentNode.leftChild = this.deleteNode(
                value,
                currentNode.leftChild
            );
            return currentNode;
        } else if (value > currentNode.value) {
            currentNode.rightChild = this.deleteNode(
                value,
                currentNode.rightChild
            );
            return currentNode;
        } else {
            if (
                currentNode.leftChild == null &&
                currentNode.rightChild == null
            ) {
                currentNode = null;
                return currentNode;
            }
            if (currentNode.leftChild == null) {
                currentNode = currentNode.rightChild;
                return currentNode;
            } else if (currentNode.rightChild == null) {
                currentNode = currentNode.leftChild;
                return currentNode;
            }

            const smallestNode = this.findMinNode(currentNode.rightChild);
            currentNode.value = smallestNode.value;

            currentNode.rightChild = this.deleteNode(
                smallestNode.value,
                currentNode.rightChild
            );
            return currentNode;
        }
    }

    findMinNode(currentNode) {
        if (currentNode.leftChild == null) {
            return currentNode;
        } else {
            return this.findMinNode(currentNode.leftChild);
        }
    }

    find(value, currentNode = this.root) {
        if (currentNode == null) {
            return null;
        } else if (value < currentNode.value) {
            return this.find(value, currentNode.leftChild);
        } else if (value > currentNode.value) {
            return this.find(value, currentNode.rightChild);
        } else {
            return currentNode;
        }
    }

    levelOrder() {
        if (this.root == null) {
            return;
        }

        const queue = [this.root];
        const values = [];

        while (queue.length > 0) {
            const currentNode = queue.shift();
            values.push(currentNode.value);

            if (currentNode.leftChild != null) {
                queue.push(currentNode.leftChild);
            }
            if (currentNode.rightChild != null) {
                queue.push(currentNode.rightChild);
            }
        }
        return values;
    }

    inorder(currentNode = this.root, values = []) {
        if (currentNode != null) {
            this.inorder(currentNode.leftChild, values);
            values.push(currentNode.value);
            this.inorder(currentNode.rightChild, values);
        }
        return values;
    }

    preorder(currentNode = this.root, values = []) {
        if (currentNode != null) {
            values.push(currentNode.value);
            this.preorder(currentNode.leftChild, values);
            this.preorder(currentNode.rightChild, values);
        }
        return values;
    }

    postorder(currentNode = this.root, values = []) {
        if (currentNode != null) {
            this.postorder(currentNode.leftChild, values);
            this.postorder(currentNode.rightChild, values);
            values.push(currentNode.value);
        }
        return values;
    }

    getHeight(value = this.root) {
        const currentNode = this.find(value);
        if (currentNode) {
            return this.getMaxHeight(currentNode);
        } else {
            return -1;
        }
    }

    getMaxHeight(currentNode) {
        if (currentNode == null) return -1;

        let leftHeight = this.getMaxHeight(currentNode.leftChild);
        let rightHeight = this.getMaxHeight(currentNode.rightChild);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    getDepth(value, currentNode = this.root, depth = 0) {
        if (currentNode == null) {
            return -1;
        }
        if (currentNode.value == value) {
            return depth;
        }

        if (currentNode.value < value) {
            return this.getDepth(value, currentNode.rightChild, depth + 1);
        } else {
            return this.getDepth(value, currentNode.leftChild, depth + 1);
        }
    }

    isBalanced() {
        if (this.checkBalance() != -1) {
            return true;
        }
        return false;
    }

    checkBalance(currentNode = this.root) {
        if (currentNode == null) {
            return 0;
        }

        let leftSubtreeHeight = this.checkBalance(currentNode.leftChild);
        let rightSubtreeHeight = this.checkBalance(currentNode.rightChild);

        if (leftSubtreeHeight == -1) return -1;
        if (rightSubtreeHeight == -1) return -1;

        if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
            return -1;
        }
        return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
    }

    rebalance() {
        sortedArray = this.inorder();
        BST.buildTree(sortedArray, 0, sortedArray.length - 1);
    }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const BST = new Tree();
const sortedArray = BST.sortArray(array);
BST.buildTree(sortedArray, 0, sortedArray.length - 1);
prettyPrint(BST.root);
BST.insert(500);
BST.insert(-10);
prettyPrint(BST.root);
console.log(BST.find(9));
console.log(BST.find(999));
BST.delete(67);
prettyPrint(BST.root);
BST.delete(-10);
prettyPrint(BST.root);
console.log(BST.levelOrder());
console.log(BST.inorder());
console.log(BST.preorder());
console.log(BST.postorder());
console.log(BST.getHeight(5));
console.log(BST.getHeight(99));
console.log(BST.getDepth(5));
console.log(BST.getDepth(99));
console.log(BST.isBalanced());
