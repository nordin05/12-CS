// Iterative

function fibs(n) {
    let lastVal = 0;
    let currentVal = 1;

    for (let i = 0; i < n; i++) {
        if (i == 0) {
            fibVal = lastVal;
        } else {
            fibVal = lastVal + currentVal;

            lastVal = currentVal;
            currentVal = fibVal;
        }
        console.log(fibVal);
    }
}

// Recursive

function fibsRec(n) {
    if (n < 2) {
        return n;
    } else {
        return fibsRec(n - 2) + fibsRec(n - 1);
    }
}

// Funcion call

fibs(19);
for (let i = 0; i <= 19; i++) {
    console.log(fibsRec(i));
}
