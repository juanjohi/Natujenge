const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

app.post('/calculate', (req, res) => {
    const expression = req.body.expression;
    try {
        const result = eval(expression);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid Expression' });
    }
});

app.listen(5500, () => {
    console.log('Server running on port 5500');
});
