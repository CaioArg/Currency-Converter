const btn = document.querySelector('.btn');
const input = document.querySelector('.input-value');
const output = document.querySelector('.output');
const isTouchDevice = window.matchMedia("(any-pointer: coarse)").matches;

async function getRates(queryString) {
    let response = await fetch(queryString);
    let jsonResponse = await response.json();
    return jsonResponse;
}

async function convertCurrency() {
    let baseCurrency = document.querySelector('.base-currency').value;
    let targetCurrency = document.querySelector('.target-currency').value;
    let inputValue = document.querySelector('.input-value').value;

    if (isNaN(inputValue) || inputValue === "") {
        output.innerHTML = "Enter a valid value";
        input.value = "";
        input.style.borderBottom = "2px solid var(--tertiary-color)";
        input.focus();
        return;
    }
    
    let queryString = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${targetCurrency}`;

    try {
        let result = await getRates(queryString);
        output.innerHTML = (result.rates[targetCurrency] * inputValue).toFixed(2);
    } catch (err) {
        alert('There was an error! Try again later');
    }
}

function validateInput() {
    if(isNaN(input.value)) {
        input.style.borderBottom = "2px solid var(--invalid-color)";
    }
    else {
        input.style.borderBottom = "2px solid var(--tertiary-color)";
    }
}

function clickBtn({key}) {
    if (key === "Enter") {
        btn.click();
    }
}

if (!isTouchDevice) {
    btn.addEventListener("mousemove", ({offsetX, offsetY, target}) => {
        target.style.backgroundImage = `radial-gradient(circle farthest-side at ${offsetX}px ${offsetY}px, #0074A9, #005075)`;
    });
    
    btn.addEventListener("mouseleave", ({target}) => {
        target.style.backgroundImage = `none`;
    });
}

btn.addEventListener("click", convertCurrency);
input.addEventListener("keyup", validateInput);
document.addEventListener("keypress", clickBtn);