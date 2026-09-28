const express = require('express');
const app = express();

app.use("api/v1/image", express.static("public/images"));
app.use("/api/v1/test", (req, res) => res.send("Hello"));

app.use((req, res) => res.status(404).send("Not Found: " + req.originalUrl));

app.listen(3000, () => {
    console.log("Started");
    const http = require('http');
    http.get('http://localhost:3000/api/v1/test', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log("Response:", data);
            process.exit(0);
        });
    });
});
