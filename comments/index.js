const app = require('express')();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};
const {randomBytes}  = require('crypto')
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id]||[])
})

app.post('/posts/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    console.log(req.body.content , req.params.id)
    const comments = commentsByPostId[req.params.id] || []
    comments.push({id:commentId,content});
    commentsByPostId[req.params.id] = comments; 
    res.status(201).send(comments);
})

app.listen(4001,()=>{
    console.log('listening on port 4001');
})