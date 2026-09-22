// Get HTML elements

const valueInput = document.getElementById("value");

const fromUnit = document.getElementById("fromUnit");

const toUnit = document.getElementById("toUnit");

const result = document.getElementById("result");

const resultUnit = document.getElementById("resultUnit");

const error = document.getElementById("error");

const clearBtn = document.getElementById("clearBtn");

const swapBtn = document.getElementById("swapBtn");


// -----------------------------------
// Conversion Factors
// -----------------------------------

// Length values are converted through meter

const lengthUnits = {

    meter: 1,

    kilometer: 1000,

    centimeter: 0.01,

    feet: 0.3048,

    inch: 0.0254,

    mile: 1609.344

};


// Weight values are converted through kilogram

const weightUnits = {

    kilogram: 1,

    gram: 0.001,

    pound: 0.45359237,

    ounce: 0.0283495231

};


// -----------------------------------
// Unit Names
// -----------------------------------

const unitNames = {

    meter: "Meter",

    kilometer: "Kilometer",

    centimeter: "Centimeter",

    feet: "Feet",

    inch: "Inch",

    mile: "Miles",

    kilogram: "Kilograms",

    gram: "Grams",

    pound: "Pounds",

    ounce: "Ounces"

};


// -----------------------------------
// Check Unit Type
// -----------------------------------

function getUnitType(unit) {

    if (lengthUnits[unit]) {

        return "length";

    }

    if (weightUnits[unit]) {

        return "weight";

    }

    return null;
}


// -----------------------------------
// Conversion Function
// -----------------------------------

function convert() {

    const value = parseFloat(valueInput.value);

    const from = fromUnit.value;

    const to = toUnit.value;


    // Empty input

    if (valueInput.value === "") {

        result.textContent = "0";

        resultUnit.textContent = unitNames[to];

        error.textContent = "";

        return;
    }


    // Invalid number

    if (isNaN(value)) {

        result.textContent = "0";

        error.textContent = "Please enter a valid number.";

        return;
    }


    // Get unit types

    const fromType = getUnitType(from);

    const toType = getUnitType(to);


    // Length to Weight or Weight to Length

    if (fromType !== toType) {

        result.textContent = "--";

        error.textContent =
            "Length and weight units cannot be converted directly.";

        resultUnit.textContent = "";

        return;
    }


    error.textContent = "";


    let convertedValue;


    // Same unit

    if (from === to) {

        convertedValue = value;

    }

    // Length conversion

    else if (fromType === "length") {

        convertedValue =
            (value * lengthUnits[from]) / lengthUnits[to];

    }

    // Weight conversion

    else if (fromType === "weight") {

        convertedValue =
            (value * weightUnits[from]) / weightUnits[to];

    }


    // Show result

    result.textContent = formatResult(convertedValue);

    resultUnit.textContent = unitNames[to];
}


// -----------------------------------
// Format Result
// -----------------------------------

function formatResult(number) {

    // Remove unnecessary decimal values

    return Number(number.toFixed(6)).toLocaleString();
}


// -----------------------------------
// Live Conversion
// -----------------------------------

valueInput.addEventListener("input", convert);

fromUnit.addEventListener("change", convert);

toUnit.addEventListener("change", convert);


// -----------------------------------
// Clear Button
// -----------------------------------

clearBtn.addEventListener("click", function () {

    valueInput.value = "";

    fromUnit.value = "meter";

    toUnit.value = "feet";

    result.textContent = "0";

    resultUnit.textContent = "Feet";

    error.textContent = "";

});


// -----------------------------------
// Swap Units
// -----------------------------------

swapBtn.addEventListener("click", function () {

    const oldFrom = fromUnit.value;

    fromUnit.value = toUnit.value;

    toUnit.value = oldFrom;

    convert();

});