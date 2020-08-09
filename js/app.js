let btn = document.querySelector('.btn');
let input = document.querySelector('.input-value');

btn.addEventListener("click", () => {
    let baseCurrency = document.querySelector('.base-currency').value;
    let targetCurrency = document.querySelector('.target-currency').value;
    let inputValue = document.querySelector('.input-value').value;
    let output = document.querySelector('.output');
    
    if(isNaN(inputValue) || inputValue === "") {
        output.innerHTML = "Enter a valid value";
        input.value = "";
        input.style.borderBottom = "2px solid var(--tertiary-color)";
        input.focus();
        return;
    }
    
    let queryString = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${targetCurrency}`;
    
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let result = JSON.parse(this.responseText);
            output.innerHTML = (result.rates[targetCurrency] * inputValue).toFixed(2);
        }
    };
    xhr.open('GET', queryString);
    xhr.send();
});

input.addEventListener("keyup", () => {
    if(isNaN(input.value)) {
        input.style.borderBottom = "2px solid var(--invalid-color)";
    }
    else {
        input.style.borderBottom = "2px solid var(--tertiary-color)";
    }
});

document.addEventListener("keypress", ({key}) => {
    if (key === "Enter") {
        btn.click();
    }
});

let mqHover = window.matchMedia("(hover: hover)");

if(mqHover.matches) {
    btn.addEventListener("mousemove", ({offsetX, offsetY, target}) => {
        target.style.backgroundImage = `radial-gradient(circle farthest-side at ${offsetX}px ${offsetY}px, #0074A9, #005075)`;
    });
    
    btn.addEventListener("mouseleave", ({target}) => {
        target.style.backgroundImage = `none`;
    });
}