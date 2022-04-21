const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

var corOptions = {
    origin: 'http://localhost:8081'
}


// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json({
//     limit: '50mb'
//   }));

  
  // app.use(bodyParser.urlencoded({
  //   limit: '50mb',
  //   parameterLimit: 100000,
  //   extended: true 
  // }));

//middleware
app.use(cors(corOptions))

app.use(bodyParser.json())

// app.use(express.urlencoded({extended: true}))


//routers

const routerad = require('./routes/adRouter')
app.use('/api/ads',routerad)

const routeru = require('./routes/userRouter')
app.use('/api/users',routeru)

const routerse = require('./routes/sellerRouter')
app.use('/api/sellers',routerse)

const routersp = require('./routes/sellerPRouter')
app.use('/api/sellerps',routersp)

const router = require('./routes/router')
app.use('/api',router)

//static images folder

app.use('/Images/profile', express.static('./Images/profile'))
app.use('/Images/Ads', express.static('./Images/Ads'))



//testing api
app.get('/', (req, res) => {
    res.json({message: 'hello from api'})
})

//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT,() => {
    console.log('server listening on port ' + PORT)
})