function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1 * num2;
}

function divide(num1,num2) {
    return num1 / num2;
}

function operate(num1,num2,operator) {
    let result;
    switch(operator) {
        case '+':
            result = add(num1,num2);
            break;
        case '-':
            result = subtract(num1,num2);
            break;
        case '*':
            result = multiply(num1,num2);
            break;
        case '/':
            if(num2 === 0) {
                result = "Why?";
            } else {
                result = divide(num1,num2);
            }
            break;
    }
    return result;
}

function renderResult() {
    if(storedVal !== "" && num1) {
        num2 = Number(storedVal);
        const result = operate(num1,num2,operator);
        display.textContent = "" + result;
        num2 = operator = null;
        if(Number(result)) {
            num1 = result;
            storedVal = "" + result;
            usingLastResult = true;
        } else {
            num1 = null;
            storedVal = "";
        }
    }
}

const display = document.querySelector('.screen');
let storedVal = "";
let num1 = null,num2 = null, operator = null;
let usingLastResult = false;
const calculator = document.querySelector('.calculator');
calculator.addEventListener('click', (e) => {
    let numberBtn = e.target.closest('.btn--number');
    let operatorBtn = e.target.closest('.btn[data-operator]');
    let equalBtn = e.target.closest('.btn--equal');

    if(numberBtn && usingLastResult && !operator) {
        usingLastResult = false;
        storedVal = "";
        num1 = null;
    }

    if(numberBtn && storedVal.length < 9) {
        storedVal += numberBtn.textContent;
        display.textContent = storedVal;
    }
    
    if(operatorBtn) {
        if(storedVal !== "") {
            if(!num1) {
                num1 = Number(storedVal);
            } else if(operator){
                renderResult();
            }
        }
        storedVal = "";
        operator = operatorBtn.dataset.operator;
    }

    if(equalBtn && operator) {
        renderResult();
    }
});
