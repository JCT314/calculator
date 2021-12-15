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
    if(Number(result) && result % 1 !== 0) {
        result = parseFloat(result.toFixed(8));
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
    let clearBtn = e.target.closest('.btn--clear');
    let deleteBtn = e.target.closest('.btn--delete');
    let decimalBtn = e.target.closest('.btn--decimal');
    

    if(numberBtn && usingLastResult && !operator) {
        usingLastResult = false;
        storedVal = "";
        num1 = null;
    }

    if((numberBtn || decimalBtn) && storedVal.length < 9) {
        if(numberBtn) {
            storedVal += numberBtn.textContent;
        }
        if(decimalBtn) {
            if(!storedVal.includes('.')) {
                storedVal += ".";
            }
        }
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

    if(clearBtn) {
        num1 = num2 = operator = null;
        storedVal = "";
        display.textContent = storedVal;
    }

    if(deleteBtn) {
        let temp = display.textContent;
        temp = temp.substring(0,temp.length - 1);
        display.textContent = temp;
        storedVal = display.textContent;
    }
});
