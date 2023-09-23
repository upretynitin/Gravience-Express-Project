const jwt = require('jsonwebtoken')
const StudentModel = require('../models/Student')

const checkauth = async (req, res, next) => {
    // console.log('hello middlewear')
    // token get
    const{token}=req.cookies
    // console.log(token)
    if(!token){
        res.redirect('/')
    }else{
        const verifytoken = jwt.verify(token,'nitin123456uprety')
        // for user data show
        const data = await StudentModel.findOne({_id:verifytoken.ID})
        // console.log(data)
        req.data1=data
        // console.log(verifytoken)
        next()
    }
}
module.exports = checkauth