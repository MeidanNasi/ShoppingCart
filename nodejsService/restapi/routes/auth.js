var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', function(req, res) {
  console.log("a user is trying to login..")
	const username = req.body.username;
  const password = req.body.password;
  console.log("usr:", username);
  console.log("pas:", password);
  const user = {
    username,
    password
  }
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
        jwt.sign({user}, 'secretkey', { expiresIn: '7d' }, (err, token) => {
          console.log(token)
          res.json({
            token
          }); 
      });
			} else {
        console.log("error: Inccorect Username or Password")
        res.status(500).send({ error: 'Inccorect Username or Password!' })
			}			
			res.end();
		});
	} else {
    console.log("error: Please enter Username and Password!")
		res.send('Please enter Username and Password!');
		res.end();
	}
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

module.exports = router;


/// *************************** ///
router.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});