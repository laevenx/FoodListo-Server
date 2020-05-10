const jwt = require('jsonwebtoken')

function generateToken(data){
    return jwt.sign(data,process.env.SECRET)
}

function verifyToken(data){
    // console.log(process.env.SECRET)
    let results = jwt.verify(data,process.env.SECRET)
    // console.log(results)
    return results
}

module.exports = {generateToken, verifyToken}