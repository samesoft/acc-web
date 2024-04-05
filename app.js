const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

});

// Start the server
const PORT = 4501;
app.listen(PORT, () => {
    console.log(`Frontend listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});