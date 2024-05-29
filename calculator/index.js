const display = document.getElementById('display');

function appendCharacter(char) {
    display.value += char;
}

function clearDisplay() {
    display.value = '';
}

async function calculate() {
    const expression = display.value;
    try {
        const response = await fetch('http://localhost:5500/calculate', {
            method: 'POST',
            mode:'cors',
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
        console.error(error);
        display.value = 'Error calculating';
    }
}

