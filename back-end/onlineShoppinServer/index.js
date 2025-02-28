const express=require('express');
const cors=require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port =process.env.PORT || 5000;

// middleWare
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uslpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection=client.db('OnlineShoppingSLAB').collection('user');
    const productCollection=client.db('OnlineShoppingSLAB').collection('products');
    




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    
    app.post('/users',async(req,res)=>{
      const newUser=req.body;
      // console.log(newUser);
      const result=await userCollection.insertOne(newUser);
      res.send(result);
    
  })



     // bondhon
  // get all campains
app.get('/allproducts',async(req,res)=>{
  const cursor=productCollection.find();
  const result=await cursor.toArray();
  res.send(result);


})





    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);


























app.get('/',(req,res)=>{
    res.send('Online shopping running   .. ');
});

app.listen(port,()=>{

    console.log(`Online shopping is running on port :${port}`);

})