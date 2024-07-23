// Get all the elements
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionList = document.getElementById('transactionList');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addTransactionButton = document.getElementById('addTransaction');

// Initialize transactions
let transactions = [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();
    
    if (descriptionInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please enter a description and amount');
        return;
    }
    
    const transaction = {
        id: generateID(),
        description: descriptionInput.value,
        amount: +amountInput.value
    };
    
    transactions.push(transaction);
    updateUI();
    
    descriptionInput.value = '';
    amountInput.value = '';
}

// Generates a unique ID for each transaction
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Update UI
function updateUI() {
    transactionList.innerHTML = '';
    
    transactions.forEach(addTransactionDOM);
    
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    
    balanceElement.innerText = `$${total}`;
    incomeElement.innerText = `+$${income}`;
    expenseElement.innerText = `-$${expense}`;
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    
    const item = document.createElement('li');
    
    item.classList.add(transaction.amount < 0 ? 'expense' : 'income');
    
    item.innerHTML = `
        ${transaction.description} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    
    transactionList.appendChild(item);
}

// Removes the  transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    
    updateUI();
}
addTransactionButton.addEventListener('click', addTransaction);

//Update UI
updateUI();
