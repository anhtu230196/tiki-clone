const express = require('express')
const router = express.Router()

const { signup, signin, signout } = require('../../controller/admin/auth')
const { requireSignin } = require('../../common-middleware/index')
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth')

router.post('/signin', validateSigninRequest, isRequestValidated, signin)
router.post('/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/signout', requireSignin, signout)

module.exports = router