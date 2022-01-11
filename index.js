require('dotenv').config();


const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { response } = require('express');
const app  = express();
const PORT = process.env.PORT || 4000;

// rate limiting
const limiter = rateLimit({
    windowMs: 10*60*1000,
    max:5,
    message: ' too many request for the port please try again later... '
    
})
app.use(limiter);
app.set('trust proxy', 1);

//routes
app.use('/api', require('./Routes/index'));


// enable cors
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})