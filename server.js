const tourRouter = require('../Assignment1/routes/tourRouter');
const adminRouter = require('../Assignment1/routes/adminRouter');
const myToursRouter = require('../Assignment1/routes/mytoursRouter')
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/travelagency', tourRouter)
app.use('/admin', adminRouter)
app.use('/mytours', myToursRouter)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
