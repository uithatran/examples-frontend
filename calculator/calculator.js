console.log("HELLO, I'M CALCULATORS");
var display, key_number;
let key_notnumber;
var flag_operator = false;
var flag_double_operator = true;
var operation;
var operation_pre = null;
var first_value = null;
var second_value, result = 0;
var operation_curr;
var key_previous;
var key_operation_previous = false;
var key_number_previous;
// HTML data Attribute HTML DOM onclick Event
function showDisplay(keys) {
    key_notnumber = keys.getAttribute("data-notnumber");
    key_number = keys.getAttribute("data-number");
    display = document.getElementById("monitor").textContent;
    if (key_notnumber) {
        switch (key_notnumber) {
            case "dot":
                dotFunc(key_previous);
                key_previous = "dot";
                break;
            case "equals":
                second_value = parseFloat(display);
                // flag_double_operator = true;
                // Display number on screen
                key_operation_previous = false;
                displayOnScreen(calculateFunc(first_value, operation, second_value));
                key_previous = "equals";
                break;
            case "ac":
                clear();
                key_previous = "ac";
                break;
            default:
                // Key-operation
                operation_pre = operation;
                operation = key_notnumber;
                if (key_previous == "add"
                    || key_previous == "sub"
                    || key_previous == "mul"
                    || key_previous == "div") {
                    operation_pre = key_previous;
                    key_previous = operation;
                    return;
                }
                if (key_operation_previous == true
                    && first_value != null
                    && typeof first_value !== 'undefined'
                    && second_value != null
                    && typeof second_value !== 'undefined') {
                    console.log("vao: ", key_operation_previous);
                    displayOnScreen(calculateFunc(first_value, operation_pre, second_value));
                    display = document.getElementById("monitor").textContent;
                    first_value = parseFloat(display);
                    second_value = "";
                    display = "0";
                    key_previous = key_notnumber;
                    return;
                }
                key_operation_previous = true;
                first_value = parseFloat(display);
                second_value = null;
                flag_operator = true;
                key_previous = key_notnumber;
                display = "0";
        }
    } else if (key_number) {
        if (key_previous == "equals"
            || key_previous == "sub"
            || key_previous == "add"
            || key_previous == "mul"
            || key_previous == "div") {
                if(key_number == "0"){
                    display = "0";
                } else {
                    display = "";
                }
            
            document.getElementById("monitor").innerHTML = display;
            second_value = "";
        }
        if (flag_operator == true) {
            // clear screen and store value previous
            flag_operator = false;
            display = "0";
        }
        if (display == "0") {
            if (keys.innerHTML == "0") {
            }
            else {
                displayOnScreen(key_number);
            }
        } else {
            display = display = document.getElementById("monitor").textContent;
            concatNumber(key_number);
        }
        key_previous = key_number;
    } else {
        console.log("ERROR number!!!!!");
    }
}

// HTML DOM textContent Property
// concatenate 
function concatNumber(_textContent) {
    // console.log(_textContent);
    document.getElementById("monitor").innerHTML = display.concat(_textContent);
    display = document.getElementById("monitor").textContent;
    second_value = parseFloat(display);
}

function displayOnScreen(_number) {
    document.getElementById("monitor").innerHTML = _number;
    display = document.getElementById("monitor").textContent;
    second_value = parseFloat(display);
}

const calculateFunc = function (_first_value, _operator, _second_value) {
    if (_operator == "add") {
        result = _first_value + _second_value;
    } else if (_operator == "sub") {
        result = _first_value - second_value;
    } else if (_operator == "mul") {
        result = _first_value * _second_value;
    } else if (_operator == "div") {
        result = _first_value / _second_value;
    } else {
        console.log("No a calculation: ", _operator);
        return 0;
    }
    return result;
}

function clear() {
    displayOnScreen(0);
    display = 0;
    key_notnumber = null;
    key_number = null;
    flag_operator = false;
    first_value = null;
    second_value = 0;
    result = 0;
    operation_curr = null;
    flag_double_operator = true;
    operation = null;
    operation_pre = null;
    key_previous = null;
    key_operation_previous = false;
    key_number_previous;
}

function dotFunc(_key_previous) {
    if (_key_previous == "mul"
        || _key_previous == "div"
        || _key_previous == "add"
        || _key_previous == "sub"
        || _key_previous == "equals") {
        display = "0";
        display = "0.";
        document.getElementById("monitor").innerHTML = display;
        flag_operator = false;
        return;
    }
    if (display.includes(".")) {
        return;
    }
    concatNumber(".");
}