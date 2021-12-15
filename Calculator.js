const display = document.querySelector('.screen');
const calculator = document.querySelector('.calculator');
let storedVal = "";
let num1 = null,num2 = null, operator = null;
let usingLastResult = false;

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

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    const keyCode = e.keyCode;
    const numberCodes = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];
    const operatorCodes = [173,191,106,107,109,111];
    const operatorShiftCodes = [61,56];
    const deleteCode = 8;
    const periodCodes = [190,110];
    const equalCodes = [61,13];


    if(((numberCodes.includes(keyCode) && !e.shiftKey) || periodCodes.includes(keyCode)) && usingLastResult && !operator) {
        usingLastResult = false;
        storedVal = "";
        num1 = null;
    }

    if((numberCodes.includes(keyCode) && !e.shiftKey) || (periodCodes.includes(keyCode)) && storedVal.length < 9) {
        if(numberCodes.includes(keyCode)) {1
            storedVal += e.key;
        }
        if(periodCodes.includes(keyCode)) {
            if(!storedVal.includes('.')) {
                storedVal += ".";
            }
        }
        display.textContent = storedVal;
    }
    
    if(operatorCodes.includes(keyCode) && !e.shiftKey || (e.shiftKey && operatorShiftCodes.includes(keyCode))) {
        if(storedVal !== "") {
            if(!num1) {
                num1 = Number(storedVal);
            } else if(operator){
                renderResult();
            }
        }
        storedVal = "";
        operator = e.key;
        console.log(operator);
    }

    if(equalCodes.includes(keyCode) && !e.shiftKey && operator) {
        renderResult();
    }

    if(keyCode === deleteCode) {
        let temp = display.textContent;
        temp = temp.substring(0,temp.length - 1);
        display.textContent = temp;
        storedVal = display.textContent;
    }
});

calculator.addEventListener('click', (e) => {
    let numberBtn = e.target.closest('.btn--number');
    let operatorBtn = e.target.closest('.btn[data-operator]');
    let equalBtn = e.target.closest('.btn--equal');
    let clearBtn = e.target.closest('.btn--clear');
    let deleteBtn = e.target.closest('.btn--delete');
    let decimalBtn = e.target.closest('.btn--decimal');
    

    if((numberBtn || decimalBtn) && usingLastResult && !operator) {
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
