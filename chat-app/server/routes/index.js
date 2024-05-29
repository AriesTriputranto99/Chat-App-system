const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require ('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateuserdetail = require('../controller/updateserdetail')
const searchUser = require('../controller/serchUser')

const router = express.Router()

router.post('/register',registerUser)

router.post('/email',checkEmail)

router.post('/password', checkPassword)

router.get('/user-details',userDetails)

router.get('/logout',logout)

router.post('/update-user',updateuserdetail)

router.post('/search-user',searchUser)


module.exports = router 