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

function compute() {
    let result;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error: Divide by zero' : prev / curr;
            break;
        default:
            return;
    }
    currentNumber = parseFloat(result.toFixed(5)).toString();
    previousNumber = '';
    operation = null;
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