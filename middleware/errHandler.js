module.exports = (err, req, res, next) => {
  
    if (err.name == 'JsonWebTokenError') {
      res.status(401).json({
        msg: 'Unable to Access, Please Login First'
      })
    } else {
      // console.log(err.message)
      res.status(err.code || 500).json({
        err: err.messare
      })
    }
  }