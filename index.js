const express =  require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

//mongodb connection
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      
      const DB = client.db('mchDB')

      const users = DB.collection('users')

      app.post('/users',async(req,res) => {
          const user =  req.body
          console.log(user)
          const savedUser = await users.insertOne(user)
          res.status(201).json(savedUser)
      })

      app.put('/users', async(req,res)=>{
          const user = req.body
          console.log(user)
          const filter = {email: user.email}
          const options = {upsert: true}
          const updateDoc = {$set: user}
          const result = await users.updateOne(
              filter, updateDoc, options
          ) 
          res.status(200).json(result)
      })
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('mdc')
})

app.listen(port, ()=>{
    console.log('api running on port', port)
})