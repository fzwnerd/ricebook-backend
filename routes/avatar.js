const uploadImage = require('../uploadCloudinary');
var express = require('express');
const bodyParder = require('body-parser');
var User = require('../models/user');
var Profiles = require('../models/profile');
var passport = require('passport');

var router = express.Router();
router.use(bodyParder.json());

router.put('/', uploadImage('avatar'), (req, res, next) => {
    const username = req.user.username;
    const avatar = req.fileurl;
    Profiles.findOneAndUpdate({username},{avatar},{new:true,upsert:true})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ username:username, avatar:avatar });
    }, (err) => next(err))
    .catch(err => next(err));
    /*
	console.log('put avatar  here')
	console.log(req.fileurl)
	console.log(username)
	if(!avatar){
		res.status(400).send("empty")
	}
	else{
		Profiles.findOneAndUpdate({username},{avatar},{new:true,upsert:true},(error,doc)=>{
			if(error){
				res.status(400).send({error:error})
			}
			else{
				if(doc){
					res.status(200).send({username, avatar:doc.avatar})
				}
				else{
					res.status(404).send({result:'Did not found headline!'})
				}
			}
		})
    }
    */
})


module.exports = router;