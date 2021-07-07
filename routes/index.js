const express = require('express');
const router = express.Router();

//login page
router.get('/', (req,res)=>{
    res.render('index');
})
//register page
router.get('/account', (req,res)=>{
    res.render('account');
})

module.exports = router;





