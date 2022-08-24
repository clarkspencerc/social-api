const router = require('express').Router();
const userRoutes = require('./user-routes'); 

// add prefix of user 
router.use('/users', userRoutes); 


module.exports = router; 