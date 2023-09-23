const mongoose = require('mongoose')
const Db_liveurl = 'mongodb+srv://uprety1999:uprety1999@cluster0.82d8oqh.mongodb.net/grevianceportal?retryWrites=true&w=majority'
const local_url = 'mongodb://127.0.0.1:27017/gravienceportal'

const connectdb = () => {
    return mongoose.connect(Db_liveurl)
        .then(() => {
            console.log('connection succesfully')
        }).catch((error) => {
            console.log(error)
        })

}
module.exports = connectdb