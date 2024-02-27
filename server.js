const tourRouter = require('./routes/tourRouter');
const adminRouter = require('./routes/adminRouter');
const myToursRouter = require('./routes/mytoursRouter')
const authRouter = require('./routes/authRouter')
const cookieParser = require('cookie-parser');  
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const fs = require('fs');
const path = require('path');
const helmet = require('helmet')

const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://code.jquery.com', 'https://stackpath.bootstrapcdn.com', 'https://cdn.jsdelivr.net'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://stackpath.bootstrapcdn.com', 'https://cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:', '*'],
        scriptSrcAttr: ["'unsafe-inline'"], 'unsafe-inline': ["'script-src'"]
      }
    })
  );
app.use(cookieParser()); 

app.use(express.static(path.join(__dirname, 'public')));
app.use('/travelagency', tourRouter)
app.use('/admin', adminRouter)
app.use('/mytours', myToursRouter)
app.use('/auth', authRouter )


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://bekaaaa121:Fytyfyty121@travelagencycluster.4zyhx4h.mongodb.net/?retryWrites=true&w=majority&appName=travelAgencyCluster')
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (e) {
        console.log(e)
    }
}

start()
