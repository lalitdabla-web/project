import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const api_url = 'https://open.er-api.com/v6/latest';

async function currencyconverter(form, to, amount) {
    try {
        const res = await axios.get(`${api_url}/${form.toUpperCase()}`);
        const rates = res.data.rates;
        if (!rates[to.toUpperCase()]) {
            console.log('Invalid currency code');
            return;
        }
        const converted = amount * rates[to.toUpperCase()];
        console.log(`${amount} ${form.toUpperCase()} = ${converted.toFixed(2)} ${to.toUpperCase()}`);
    } catch (error) {
        console.error('Error fetching currency data:', error.message);
    }
}

rl.question('Enter the currency to convert from: ', (form) => {
    rl.question('Enter the currency to convert to: ', (to) => {
        rl.question('Enter the amount: ', (amount) => {
            const amt = parseFloat(amount);
            if (isNaN(amt) || amt <= 0) {
                console.log('Invalid amount. Please enter a positive number.');
                rl.close();
                return;
            }
            currencyconverter(form.trim().toUpperCase(), to.trim().toUpperCase(), amt);
            rl.close();
        });
    });
});
