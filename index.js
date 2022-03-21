const express =  require('express')
const app = express()
const cors = require('cors')
const mongodb = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('mdc')
})

app.listen(port, ()=>{
    console.log('api running on port', port)
})