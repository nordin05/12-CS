export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.rightChild !== null) {
        prettyPrint(
            node.rightChild,
            `${prefix}${isLeft ? "│   " : "    "}`,
            false
        );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
        prettyPrint(
            node.leftChild,
            `${prefix}${isLeft ? "    " : "│   "}`,
            true
        );
    }
};
