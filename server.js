const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Handle POST requests to /generate-response
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/generate-response', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Call the Python script with the user's input
        PythonShell.run('chatterbot_response.py', { args: [prompt] }, (err, output) => {
            if (err) {
                console.error('Error executing Python script:', err);
                res.status(500).json({ error: "Couldn't generate a response at the moment." });
            } else {
                res.json({ response: output[0] });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Couldn't generate a response at the moment." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
