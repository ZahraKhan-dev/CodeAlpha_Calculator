let display = document.getElementById("display");

let firstNumber = "";
let operator = "";
let secondNumber = "";

let newNumber = true;


/* Add Number */

function addNumber(number) {

    if (newNumber) {
        display.value = number;
        newNumber = false;
    } else {
        display.value = display.value + number;
    }
}


/* Add Decimal */

function addDecimal() {

    if (newNumber) {
        display.value = "0.";
        newNumber = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value = display.value + ".";
    }
}


/* Add Operator */

function addOperator(selectedOperator) {

    if (display.value === "") {
        return;
    }

    if (operator !== "" && !newNumber) {
        calculate();
    }

    firstNumber = parseFloat(display.value);

    operator = selectedOperator;

    newNumber = true;
}


/* Calculate */

function calculate() {

    if (operator === "" || display.value === "") {
        return;
    }

    secondNumber = parseFloat(display.value);

    let result;


    if (operator === "+") {

        result = firstNumber + secondNumber;

    }

    else if (operator === "-") {

        result = firstNumber - secondNumber;

    }

    else if (operator === "*") {

        result = firstNumber * secondNumber;

    }

    else if (operator === "/") {

        if (secondNumber === 0) {

            display.value = "Error";

            firstNumber = "";
            secondNumber = "";
            operator = "";

            newNumber = true;

            return;
        }

        result = firstNumber / secondNumber;
    }


    /* Remove unnecessary decimal */

    if (Number.isInteger(result)) {
        display.value = result;
    } else {
        display.value = parseFloat(result.toFixed(10));
    }


    firstNumber = result;
    secondNumber = "";

    operator = "";

    newNumber = true;
}


/* Percentage */

function percentage() {

    if (display.value === "") {
        return;
    }

    let number = parseFloat(display.value);

    let result = number / 100;

    display.value = result;

    newNumber = true;
}


/* Clear */

function clearDisplay() {

    display.value = "";

    firstNumber = "";
    secondNumber = "";
    operator = "";

    newNumber = true;
}


/* Delete */

function deleteNumber() {

    if (display.value.length > 0) {

        display.value =
            display.value.slice(0, -1);
    }
}


/* Keyboard Support */

document.addEventListener("keydown", function(event) {

    /* Numbers */

    if (event.key >= "0" && event.key <= "9") {

        addNumber(event.key);
    }


    /* Decimal */

    else if (event.key === ".") {

        addDecimal();
    }


    /* Operators */

    else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
    ) {

        addOperator(event.key);
    }


    /* Enter */

    else if (event.key === "Enter" || event.key === "=") {

        calculate();
    }


    /* Backspace */

    else if (event.key === "Backspace") {

        deleteNumber();
    }


    /* Escape */

    else if (event.key === "Escape") {

        clearDisplay();
    }


    /* Percentage */

    else if (event.key === "%") {

        percentage();
    }

});