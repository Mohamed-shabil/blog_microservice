const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


app.use(bodyParser.json());
app.use(cors());
app.post('/events', async(req,res)=>{
    const event = req.body;
    console.log(event)
    await axios.post('http://localhost:4000/events',{event})
    await axios.post('http://localhost:4001/events',{event})
    res.send({status:'OK'});
})

app.post('/events',(req,res)=>{
    console.log('Received Events', req.body.type);
    res.send({});
})

app.listen(4005,()=>{
    console.log('Listening on Port 4005');
})
