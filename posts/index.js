const app = require('express')();
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const posts = {};


app.use(bodyParser.json());
app.get('/post',(req,res)=>{
    res.send(posts);
})

app.post('/post',(req,res)=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body;
    posts[id] = {
        id,title
    };
    res.status(201).send(posts[id])
})


app.listen(4000,()=>{
    console.log('Posts running on Port 4000')
})