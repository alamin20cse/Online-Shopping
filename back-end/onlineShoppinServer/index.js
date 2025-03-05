const express=require('express');
const cors=require('cors');
require('dotenv').config();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
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
    const paymentCollection=client.db('OnlineShoppingSLAB').collection('payments');




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    
    app.post('/users',async(req,res)=>{
      const newUser=req.body;
      // console.log(newUser);
      const result=await userCollection.insertOne(newUser);
      res.send(result);

      
  })


  // afrin
  // addproduct
  
  app.post('/products',async(req,res)=>{
    const newproduct=req.body;
    console.log(newproduct);
    const result=await productCollection.insertOne(newproduct);
    res.send(result);
    
})



  // bondhon
  // get all campains
app.get('/allproducts',async(req,res)=>{
  const cursor=productCollection.find();
  const result=await cursor.toArray();
  res.send(result);


})


 // for  specific Product
 app.get('/allproduct/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await productCollection.findOne(query);
  res.send(result);
});









// Payment intent 
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { price } = req.body;

    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    const amount = parseInt(price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });



    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// payment information
app.post('/payments',async(req,res)=>{
  const payment=req.body;
  const result=await paymentCollection.insertOne(payment);
  res.send(result);

})

// get all payment information for admin only
// get all campains
app.get('/payments',async(req,res)=>{
  const cursor=paymentCollection.find();
  const result=await cursor.toArray();
  res.send(result);
})


  // get user logged payment
  app.get('/mypayments',async(req,res)=>{
    const email=req.query.email;
    const query={email:email};

    const result=await paymentCollection.find(query).toArray();
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