const express = require('express')
const verifyToken = require('../middlewares/authMiddleware')
const authorizedRoles = require('../middlewares/roleMiddleware')

const router = express.Router()

//Only can admin access this route
router.get('/admin',verifyToken, authorizedRoles('admin') ,(req, res) => {
    res.json({
        message: 'Admin can access this route'
    })
})
//only admin and manager can access this route
router.get('/manager',verifyToken,authorizedRoles('admin','manager') , (req, res) => {
    res.json({
        message: 'Manager can access this route'
    })
})
//only user can access this route
router.get('/user',verifyToken,authorizedRoles('admin','manager','user') , (req, res) => {
    res.json({
        message: 'User can access this route'
    })
})

module.exports = router