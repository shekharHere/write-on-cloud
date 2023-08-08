var jwt = require('jsonwebtoken');
const jwt_secret = "secret_2_gener@te_token";

const fetchuser = ( req, res, next ) => {
    // Get the user details using jwt token and add id to req object
    const token = req.header('auth-token');
    
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid ID" }); // sending unauthorized request when to token found in req
    }

    try {
        const data = jwt.verify( token, jwt_secret );
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid ID" }); // sending unauthorized request when to token found in req
    }
}

module.exports = fetchuser;
