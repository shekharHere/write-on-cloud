const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const jwt_secret = "secret_2_gener@te_token";
const router = express.Router();

// Create a user using 'POST' request "/api/auth/createUser". No login required
router.post('/createUser', [
    body('name').isLength({ min: 3 }), // must contain atleast 3 characters
    body('email', 'Enter a valid email.').isEmail(), // must be an email -- 2nd param is used to give customized error msg
    body('password').isLength({ min: 8 }) // must contain atleast 8 characters
] , async (req, res)=> {

    let success = false;

    const errors = validationResult(req); // Find validation errors if any
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        // check whether user exists or not
        let userDetails = await User.findOne({email: req.body.email});
        if (userDetails) {
            return res.status(400).json({ success: success, error: "Sorry! User with same email already exists." })
        }

        // Creating hash code to secure password
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        // Create user on database
        userDetails = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        })
        
        const data = {
            user: {
                id: userDetails.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        res.json({
            success: success,
            authToken: authToken
        });

    } catch (error) {
        // handle any error while API callout
        // console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }

});


// Authenticate then login a user using 'POST' request "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(), // must be an email -- 2nd param is used to give customized error msg
    body('password').not().isEmpty()
] , async (req, res)=> {

    let success = false;

    const errors = validationResult(req); // Find validation errors if any
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    let { email, password } = req.body;
    
    try {
        let user = await User.findOne({email});
        if (!user) {
            success = false;
            return res.status(400).json({error: "Please enter correct login credentials!"})
        }

        const passCompare = await bcrypt.compare( password, user.password );
        if (!passCompare) {
            success = false;
            return res.status(400).json({error: "Please enter correct login credentials!"})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        res.json({
            success,
            authToken
        });
    } catch (error) {
        // handle any error while API callout
        // console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }

});

// Get loggedin user details using 'POST' request "/api/auth/getuser". Login required
router.post('/getuser', fetchuser , async (req, res)=> {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        // handle any error while API callout
        // console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
});

module.exports = router;
