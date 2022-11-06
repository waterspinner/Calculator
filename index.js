//store input data in calculator object
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };


// Update Display 
function updateDisplay() {
    // select the element with class of `calculator-screen`
    const display = document.querySelector('.calculator-screen');
    // update the value of the element with the contents of `displayValue`
    display.value = calculator.displayValue;
  }
  
updateDisplay();

//assign input constant
const keys = document.querySelector('.calculator-keys');

//take input and assign values to display
keys.addEventListener('click', (event) => {
    // access the clicked element
    const {target} = event;

    // check if clicked element is a button
    // return if not
    if (!target.matches('button')) {
      return;
    }
    if (target.classList.contains('operator')){
      handleOperator(target.value);
      updateDisplay();
      return;
    }
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }
    if (target.classList.contains('equal-sign')) {
      equalSign();
      updateDisplay();
      console.log(calculator);
      return;
    }
    if (target.classList.contains('delete')) {
      deleteLastDigit();
      updateDisplay();
      return;
    }
   
    if (target.classList.contains('negativePositive')) {
      negativePositive();
      updateDisplay();
      return;
    }
    inputDigit(target.value);
    updateDisplay();
});

// take digit input and display
function inputDigit(digit) {
  const {displayValue, waitingForSecondOperand} = calculator;
  if (digit === 'delete') {
    return;
  }
  //if firstOperand and operator entered, clear screen and wait for second operand
  else if (waitingForSecondOperand === true) {
    //this clears screen of first operand, and assigns digit the new second operand
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
  // overwrite displayValue if current value is '0', otherwise append to it
  else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

// insert a decimal
function inputDecimal (dot) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = '0.';
      calculator.waitingForSecondOperand = false;
      console.log(calculator);
      return;
    }
  
  // if the 'displayValue' property does not contain a decimal
    if(!calculator.displayValue.includes(dot)) {
      // append the decimal
      calculator.displayValue += dot;
    }
  }

function handleOperator (nextOperator) {
  // destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  // 'parseFloat' converts the string on the calculator object
  // into a floating-point number
  const inputValue = parseFloat(displayValue);

  // verify that 'firstOperand' is null and that the inputValue
  // is not a NaN value
  if (firstOperand === null && !isNaN(inputValue)) {
    //update the first operand property
    calculator.firstOperand = inputValue;
  }
  else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  //assign operator value to operator property in calculator object
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (firstOperand === null) {
    return secondOperand;
  }
  else if (operator === '+') {
    return firstOperand + secondOperand;
  }
  else if (operator === '-') {
    return firstOperand - secondOperand;
  }
  else if (operator === '*') {
    return firstOperand * secondOperand;
  }
  else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function equalSign() {
  const {waitingForSecondOperand} = calculator;
  const result = calculate(calculator.firstOperand, parseFloat(calculator.displayValue), calculator.operator);
    if (waitingForSecondOperand === true) {
      return;
    } 
    else { 
      calculator.displayValue = String(result);
      calculator.firstOperand = null;
    }
}

function resetCalculator () {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function deleteLastDigit() {
  const {displayValue} = calculator;
  if (displayValue.length === 1) {
    calculator.displayValue = '0';
    return;
  }
  else {
  calculator.displayValue = displayValue.substring(0, displayValue.length - 1);
  console.log(calculator);
  }
}

function negativePositive() {
  const {displayValue} = calculator;
  const value = parseFloat(displayValue);
  if(value === 0) {
    calculator.displayValue = '-';
    console.log(calculator);
  }
  else {
  calculator.displayValue = value * -1;
  console.log(calculator);
  }
}