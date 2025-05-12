const express=require('express');
const cors=require('cors');
require('dotenv').config();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const SSLCommerzPayment = require('sslcommerz-lts')
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


const store_id = process.env.STOREID;
const store_passwd = process.env.STOREPASS;
const is_live = false //true for live, false for sandbox

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection=client.db('OnlineShoppingSLAB').collection('user');
    const productCollection=client.db('OnlineShoppingSLAB').collection('products');
    const paymentCollection=client.db('OnlineShoppingSLAB').collection('payments');
    const districtsCollection=client.db('OnlineShoppingSLAB').collection('districts');




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



 // payment data
    app.get('/users',async(req,res)=>{
     
      const  cursor=userCollection.find();
      const result=await cursor.toArray();
      res.send(result);

    })


     // payment data
    app.get('/payments',async(req,res)=>{
     
      const  cursor=paymentCollection.find();
      const result=await cursor.toArray();
      res.send(result);

    })


    
    // get user logged
    app.get('/user', async(req,res)=>{
        const email=req.query.email;
        const query={email:email};

        const result=await userCollection.find(query).toArray();
        res.send(result);
    })


     // payment data
    app.get('/districts',async(req,res)=>{
     
      const  cursor=districtsCollection.find();
      const result=await cursor.toArray();
      res.send(result);

    })




















// ssLC
app.post('/order', async (req, res) => {
  // Generate unique transaction ID
  const transactionId = new ObjectId().toString();

  // Extract payment details from request body
  const { email, name, amount,  productName,BrandName, productId, thumbnail } = req.body;
  const payDetails=req.body;
  console.log(payDetails)

  const data = {
    total_amount: parseFloat(amount), // Ensure amount is a number
    currency: "BDT",
    tran_id: transactionId, // Unique transaction ID
    success_url: `http://localhost:5000/payment/success/${transactionId}`,
    fail_url: `http://localhost:5000/payment/fail/${transactionId}`,
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name:productName  || "Donation",
    product_category: "Donation",
    product_profile: "general",
    cus_name: name || "Anonymous",
    cus_email: email || "unknown@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: name || "Anonymous",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: "1000",
    ship_country: "Bangladesh",
  };


  console.log(data);

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
const finalpay= {
  email, name, amount, BrandName, productId, thumbnail,productName,
  paidStatus:false,
  TranstionID: transactionId,
   date: new Date().toISOString(),  

}
const result=paymentCollection.insertOne(finalpay);


    console.log('Redirecting to: ', GatewayPageURL);
  });
});



// ✅ Fix: Move this route outside of '/order' and ensure correct path
app.post('/payment/success/:tranId', async (req, res) => {
  console.log("Transaction ID:", req.params.tranId);

  const result=await paymentCollection.updateOne({TranstionID:req.params.tranId},{$set:{
    paidStatus:true,
  }


  })
  if(result.modifiedCount>0)
  {
    res.redirect(`http://localhost:5173/payment/success/${req.params.tranId}`)

  }


});



app.post('/payment/fail/:tranId', async (req, res) => {
  console.log("Transaction ID:", req.params.tranId);

  const result=await paymentCollection.deleteOne({TranstionID:req.params.tranId})
  

 if(result.deletedCount>0)
  {
    res.redirect(`http://localhost:5173/payment/fail/${req.params.tranId}`)

  }


});




 














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