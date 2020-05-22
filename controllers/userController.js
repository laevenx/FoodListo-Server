const {generateToken} = require('../helpers/jwt')
const { User } = require('../models')
const googleVerification = require('../helpers/googleOAuth')    

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

    static googleLogin(req, res, next) {
        let google_token = req.headers.google_token;
        let email = null;
        let newUser = false;
        // let first_name = null;
        // let last_name = null
    
        googleVerification(google_token)
          .then(payload => {
            email = payload.email;
            // first_name = payload.given_name;
            // last_name = payload.family_name
            // console.log('payload: ', payload)
            // console.log('emaul: ', email)
            return User
              .findOne({
                where: {
                  email
                }
              })
          })
          .then(user => {
            if (user) {
              return user;
            } else {
              newUser = true;
              return User
                .create({
                  email,
                  password: process.env.DEFAULT_GOOGLE_PASSWORD
                });
            }
          })
          .then(user => {
            let code = newUser ? 201 : 200;
    
            const token = generateToken({
              id: user.id,
              email: user.email
            });
    
            res.status(code).json({
              token
            });
          })
          .catch(err => {
            next(err);
          })
      }
}

module.exports = UserController