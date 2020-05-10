const axios = require('axios')
class DataController{

    static home (req,res){
        // let search = 'a'
        
        axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`,{})
                .then(response => {
                    // let data = Flatted.stringify(response)
                    res.status(200).json(response.data)
                })
                .catch(err => {
                    res.status(500).json({
                        err : 'INTERNAL SERVER ERROR'
                    })
                })
    }

    static foodData (req,res){
        // console.log('test')
        let {searchname} = req.body
        if(searchname){
            axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchname}`,{
                params: {
                    'f' : searchname
                }
            })
            .then((response) => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                res.status(400).json({
                    err : err.message
                })
            })
        }else{
            res.status(400).json({
                err : 'searchname is empty'
            })
        }
       
    }

    static homelog(req,res){

    }
}

module.exports = DataController