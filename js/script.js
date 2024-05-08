let currentNumber = '';
let previousNumber = '';
let operation = null;

const display = document.querySelector('#display');

function updateDisplay() {
    display.textContent = `${previousNumber} ${operation || ''} ${currentNumber}`;
}

function chooseOperation(op) {
    if (currentNumber === '' && previousNumber === '') return;
    if (currentNumber !== '' && previousNumber !== '') compute();
    if (currentNumber !== '') {
        previousNumber = currentNumber;
        currentNumber = '';
    }
    operation = op;
    updateDisplay();
}

// this function runs when the user clicks on an operator button
function chooseOldOperation(op) {
    // First case: no number has been entered yet
    // If we never got a number, we need to stop the function
    if (currentNumber === '') return;
    // Second case: we have two numbers and an operation
    // If we have a previous number, we need to compute the result before this 
    // operation
    if (previousNumber !== '') {
        compute();
    }
    // Third case: we have a currentNumber and an operation
    else {
        previousNumber = currentNumber;
        currentNumber = '';
    }
    
    // We store the operation
    operation = op;
    
    // If the user clicked on an operation after compute, we gotta
    // put the result in previous number
    if (currentNumber !== '') {
        previousNumber = currentNumber;
        currentNumber = '';
    }
    updateDisplay();
    // We reset the current number
    currentNumber = '';
}

function compute() {
    console.log("Computing: ", previousNumber, currentNumber, operation);
    let computation;
    // Let's convert the string numbers to actual numbers
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    // If we don't have two numbers, we need to stop the function
    if (isNaN(prev) || isNaN(current)) return;
    // Let's compute the result
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = current === 0 ? 'Error: Divide by zero' : prev / current;
            break;
        default:
            return;
    }
    // We store the result
    currentNumber = computation.toString();
    // Reset previous number and operation
    operation = null;
    previousNumber = '';
    // Show the result
    display.textContent = currentNumber;
}

function deleteLast() {
    if (currentNumber !== '') {
        currentNumber = currentNumber.slice(0, -1);
    }
    else if (operation) {
        operation = null;
        currentNumber = previousNumber;
        previousNumber = '';
    }
    else if (previousNumber !== '') {
        previousNumber = previousNumber.slice(0, -1);
    }
    updateDisplay();
}

function oldDeleteLast() {
    if (operation) {
        operation = null;
        currentNumber = previousNumber;
        previousNumber = '';
    }
    else if (currentNumber !== '') {
        currentNumber = currentNumber.slice(0, -1);
    }
    else if (previousNumber !== '') {
        previousNumber = previousNumber.slice(0, -1);
        currentNumber = previousNumber;
        previousNumber = '';
    }
    updateDisplay();
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function() {
        // The current number takes the latest entered number
        currentNumber += this.value;
        updateDisplay(this.value);
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        chooseOperation(this.value);
    });
});

document.querySelector('#equals').addEventListener('click', function() {
    compute();
    updateDisplay();
});

document.querySelector('#clear').addEventListener('click', function() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    display.textContent = '';
});

document.querySelector('#backspace').addEventListener('click', function() {
    deleteLast();
});