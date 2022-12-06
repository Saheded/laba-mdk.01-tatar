const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');
const User = require('../Models/User');

const {check, validationResult} = require('express-validator');

router.get('/', auth, async (req,res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/',[
    check('email','Укажите email').isEmail(),
    check('password','Укажите пароль').exists()
], async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name,email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({errors: [{msg: 'Неправильные данные'}] });
        }
        const isMath = await bcrypt.compare(password, user.password);
        if(!isMath){
            res.status(400).json({errors:[{msg: 'Данные не корректы'}] });
        }
        const payload = {
            user: {id: user.id}
        }

        jwt.sign(payload,config.get('jwtSecret'), {expiresIn: 3600000},
            (err, token) =>{
                if (err) throw err;
                res.json({token})
            });
    } catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;