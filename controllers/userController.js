const {generateToken} = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
    static login(req,res,next){
        
        const {email , password} = req.body
        // console.log('test')
        User
            .findOne({where:{email : req.body.email}})
            .then(data => {
                // console.log('test')
                if(data){
                    // console.log('test')
                    if (password == data.password){
                        // console.log('test')
                        let token = generateToken({
                                        id : data.id,
                                        email : data.email,
                                        password : data.password
                                    })
                        res.status(200).json({token : token})

                    }else {
                        // console.log('test')
                        res.status(400).json({error : 'invalid password'})

                    }
                }else {

                    res.status(401).json({error : 'invalid email'})

                }
                
                })
                // .catch(next)
            .catch(err => {
                
                            res.status(500).json({error : err})               
                            })

    }
}

module.exports = UserController