//Create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Read data from file
let rawdata = fs.readFileSync('comments.json');
let comments = JSON.parse(rawdata);

//Display all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

//Display a comment by id
app.get('/comments/:id', (req, res) => {
    let id = req.params.id;
    let comment = comments.find(c => c.id == id);
    if(comment){
        res.send(comment);
    }else{
        res.status(404).send("Comment not found");
    }
});

//Create a new comment
app.post('/comments', (req, res) => {
    let comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

//Update a comment by id
app.put('/comments/:id', (req, res) => {
    let id = req.params.id;
    let comment = comments.find(c => c.id == id);
    if(comment){
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        res.send(comment);
    }else{
        res.status(404).send("Comment not found");
    }
});

//Delete a comment by id
app.delete('/comments/:id', (req, res) => {
    let id = req.params.id;
    let comment = comments.find(c => c.id == id);
    if(comment){
        let index = comments.indexOf(comment);
        comments.splice(index, 1);
        res.send(comment);
    }else{
        res.status(404).send("Comment not found");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});