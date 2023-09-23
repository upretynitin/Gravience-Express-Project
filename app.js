const express = require('express')
// console.log(express)
const app = express()
const port = 3000
const web = require('./route/web')
const connectdb=require('./db/connectdb')
// cookies
const cookieparser = require('cookie-parser')
app.use(cookieparser())
//for msg show
let session = require('express-session')
let flash = require('connect-flash');
const fileupload = require("express-fileupload");
//for file upload
app.use(fileupload({useTempFiles: true}));

// for msg show use
app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,

}));

app.use(flash());


// view engine ejs
app.set('view engine', 'ejs')
// for image and css
app.use(express.static('public'))
// db connection
connectdb()
//data show get
app.use(express.urlencoded({extended:true}))

//routing load
app.use('/',web)





//server create
app.listen(port, () => {
    console.log(`server is running localhost: ${port}`)
  })

  