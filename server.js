const router = require('../Assignment1/routes/tourRouter');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/travelagency', router)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
