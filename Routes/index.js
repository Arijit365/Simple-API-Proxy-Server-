
const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');


// env variables
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// cache
let cache = apicache.middleware;

 router.get('/', cache('2 minutes') ,  async(req , res) =>{
     res.send('API SERVICE');
    try{
        
   const params = new URLSearchParams({
       [API_KEY_NAME]: API_KEY_VALUE,
         ...url.parse(req.url, true).query
   })
 const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
       const data = apiRes.body;
    
       // log the request for the public api 
       if(process.env.NODE_ENV !== 'produnction'){
           console.log(`REQUEST: ${API_BASE_URL}`)
       }

       res.status(200).json(data);
    }

    catch(error){
          res.status(201).json({error});
    }
})   

module.exports = router;
