const express = require('express');
const router = express.Router();

const Post = require('../Models/posts');
const User = require('../Models/User');

const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const e = require("express");

router.post('/', auth, [
    check('text', 'укажите текст для сообщения')
], async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try{
        const user = await User.findById(req.user.id).select('-password');


        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', auth, [
    check('text', 'Введите текст').not().isEmpty()
], async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(400).json({msg: 'Пост не найден'});
        }
        if (post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Пользователь не авторизован'});
        }
        console.log(post.user.toString(), '   ', req.params.id)

        post.text = req.body.text;

        await post.save();

        res.json(post);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req,res) => {
    try{
        const post = await  Post.findById(req.params.id);
        if(!post){
            return res.status(400).json({msg: 'Пост не найден'});
        }
        if (post.user.toString() !== req.user.id){
            return res.status(400).json({msg: 'Пользователь не авторизован'});
        }
        await post.delete();
        res.json({msg: 'Post deleted'});
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', auth,async (req,res) =>{
    try {
        const  user_id = req.user.id;
        const posts = await Post.find({'user': user_id}).sort({date:-1});
        res.json(posts);
    }    catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/all/', auth,async (req,res)=>{
    try{
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;