const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

function authentication(req,res,next){
    let token = req.headers.token
    
    try{
        console.log('test')
        let decode = verifyToken(token)
        console.log(decode)
        let {id} = decode
        
        User.findByPk(id)
            .then(data => {
                if(data){
                    next()
                }else{
                    throw{
                        msg: 'please login first',
                        code : 401
                    }
                }
            })
            .catch(err => {
                res.status(404).json({
                    error : err.message
                })
            })
    }
    catch{
        
        next(err)
    }
}

module.exports = authentication