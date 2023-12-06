const app = require('express')();
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};
const {randomBytes}  = require('crypto')
app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id]||[])
})

app.post('/posts/:id/comments', async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    console.log(req.body.content , req.params.id)
    const comments = commentsByPostId[req.params.id] || []
    comments.push({id:commentId,content});
    commentsByPostId[req.params.id] = comments; 
    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.id
        }
    })
    res.status(201).send(comments);
})

app.post('/events',(req,res)=>{
    console.log(req.body)
    console.log('Event Received',req.body);
    res.send({});
})

app.listen(4001,()=>{
    console.log('listening on port 4001');
})