const user = {
    name: "Mariana",
    transactions: [],
    balance: 0
};

function createTransaction(transaction) {
    user.transactions.push(transaction)

    if (transaction.type == 'credit') {
        user.balance += transaction.value
    } else {
        user.balance -= transaction.value
    }
}

function getHigherTransactionByType(type) {
    let highestValue = 0
    for (transaction of user.transactions) {
        if (transaction.type == type) {
            if (highestValue < transaction.value) {
                highestValue = transaction.value
            }
        }
    }

    console.log(`type: ${type}, value: ${highestValue}`)
}

function getAverageTransactionValue() {
    let sum = 0

    for (transaction of user.transactions) {
        sum += transaction.value
    }

    let average = sum / (user.transactions).length
    console.log(average)
}

function getTransactionsCount() {
    let creditCount = 0
    let debitCount = 0

    for (transaction of user.transactions) {
        if (transaction.type == 'credit') {
            creditCount += 1
        } else {
            debitCount += 1
        }
    }
    let count = {
        credit: creditCount,
        debit: debitCount
    }

    console.log(count)
}

createTransaction({
    type: "credit",
    value: 50
});
createTransaction({
    type: "credit",
    value: 120
});
createTransaction({
    type: "debit",
    value: 80
});
createTransaction({
    type: "debit",
    value: 30
});

console.log(user.balance);
getHigherTransactionByType("credit");
getHigherTransactionByType("debit");

getAverageTransactionValue();
getTransactionsCount()