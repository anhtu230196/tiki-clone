const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email }).then(async (user) => {
        if (user) return res.status(400).json({
            message: 'Admin already registered'
        })

        const { firstName, lastName, email, password } = req.body
        const hash_password = await bcrypt.hash(password, 10)

        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: Math.random().toString(),
            role: 'admin'
        })

        _user.save().then(data => {
            return res.status(201).json({
                user: data
            })
        }).catch(err => {
            return res.status(400).json({
                message: 'Something wrong'
            })
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user || user.role !== 'admin') return res.status(400).json({ message: 'Admin not found!' })
        if (!user.authenticate(req.body.password)) return res.status(400).json({ message: 'Wrong password' })

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '90d' })
        const { _id, firstName, lastName, email, role, fullName } = user
        res.cookie('token', token, { expiresIn: '90d' })
        res.status(200).json({
            token,
            user: {
                _id, firstName, lastName, email, role, fullName
            }
        })
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong' })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: "Signout successfully!"
    })
}