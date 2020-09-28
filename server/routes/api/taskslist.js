const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async (req, res) => {
    const posts = await loadTasksCollection();
    res.send(await posts.find({}).toArray());
})

//add post

router.post('/', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.insertOne({
        task: req.body.task,
        dateCreated: new Date()
    });
    res.status(201).send();
});



//delete post

router.delete('/:id', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://HuyDaraPichchan:1234@mytasks.qbixn.mongodb.net/test', {
        useNewUrlParser: true
    })

    return client.db('my_tasklist').collection('mytask');
}


module.exports = router;