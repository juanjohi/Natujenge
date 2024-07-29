const display = document.getElementById('display');
const blink = document.getElementById('demo');

function chukuaCharacter(char) {
    display.value += char;
}

function clearDisplay() {
    display.value = '';
}

function demo() {
    display.value = 'Natujenge'
    
}


async function calculate() {
    const expression = display.value;
    try {
        const response = await fetch('http://localhost:5500/calculate', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression })
        });
        const responseData = await response.json();

        if (response.ok) {
            display.value = responseData.result;
        } else {
            throw new Error(responseData.error || 'Unknown error occurred');
        }
    } catch (error) {
        console.log(error);
        display.value = 'Error calculating';
    }
}


document.addEventListener('keydown', event => {
    const key = event.key
    if (key.length === 1 && /[0-9+\-*=]/.test(key)) {
        chukuaCharacter(key)
    } else if (key === 'Enter') {
        calculate()
    } else if (key === 'Escape') {
        clearDisplay()
    }
})
