var router = require('express').Router();
var email = require('../../utils/email');

router.post('/sendmail', function(req,res){
    console.log('Send mail');
    email.sendEmail(req, res);
});
module.exports = router;