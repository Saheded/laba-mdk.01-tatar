const express = require('express');
const router = express.Router();
const config = require('config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

const User = require('../Models/User');

router.post('/',
    [
        check('name', 'Укажите имя пользователя').not().isEmpty(),
        check('email', 'Укажите корректный email').isEmail(),
        check('password', 'Укажите пароль длиной не менее 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;
        try {
            let user = await User.findOne({email})

            if (user) {
                res.status(400).json({errors: [{msg: 'Пользователь уже существует'}]});
            }
            user = new User({name, email, password});
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {id: user.id}
            };
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000},
                (err, token) => {
                    if (err) throw err;
                    res.json({token})
                });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;