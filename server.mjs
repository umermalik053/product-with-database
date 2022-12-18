import express from 'express';
import cors from 'cors'; 
import path from 'path';
import mongoose from 'mongoose';


let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String,
  description: String,
  createdOn: { type: Date, default: Date.now }
});
const productModel = mongoose.model('products', productSchema);





const app = express()
const port = process.env.PORT || 5001


app.use(express.json());
app.use(cors());

app.post("/product", (req,res) =>{
  const body = req.body;

  if (!body.name||!body.price||!body.category||!body.description){
    res.status(400).send(`required parameter missing. example request body:
    {
      "name":"value",
      "price":"value",
      "category":"value",
      description":"value"
    }`)
    return;
  }
  productModel.create({
    name:body.name,
    price:body.price,
    category: body.category,
    description: body.description,
  },(err,saved)=>{
    if(!err){
      console.log(saved);
      res.send({
        message : "your product is saved"
      })
    }else{
      res.status(500).send({
        message: "server error"
      })
    }
  })
})
app.get('/products', (req, res) => {

  productModel.find({}, (err, data) => {
      if (!err) {
          res.send({
              message: "this is all your product",
              data: data
          })
      } else {
          res.status(500).send({
              message: "server error"
          })
      }
  });
})

app.get('/product/:id', (req, res) => {

  const id = req.params.id;

  productModel.findOne({ _id: id }, (err, data) => {
      if (!err) {

          if (data) {
              res.send({
                  message: "here is you product",
                  data: data
              })
          } else {
              res.status(404).send({
                  message: "product not found",
              })
          }

      } else {
          res.status(500).send({
              message: "server error"
          })
      }
  });
})
app.put('/product/:id', async (req, res) => {

  const id = req.params.id;
  const body = req.body;

  if (
      !body.name ||
      !body.price ||
      !body.category ||
      !body.description
  ) {
      res.status(400).send(` required parameter missing. example request body:
      {
          "name": "value",
          "price": "value",
          "category": "value",
          "description": "value"
      }`)
      return;
  }

  try {
      let data = await productModel.findByIdAndUpdate(id,
          {
              name: body.name,
              price: body.price,
              category: body.category,
              description: body.description
          },
          { new: true }
      ).exec();

      console.log('updated: ', data);

      res.send({
          message: "product is updated successfully",
          data: data
      })

  } catch (error) {
      res.status(500).send({
          message: "server error"
      })
  }
})
app.delete('/products', (req, res) => {

  productModel.deleteMany({}, (err, data) => {
      if (!err) {
          res.send({
              message: "All Products has been deleted successfully",
          })
      } else {
          res.status(500).send({
              message: "server error"
          })
      }
  });
})

app.delete('/product/:id', (req, res) => {

  const id = req.params.id;

  productModel.deleteOne({ _id: id }, (err, deletedData) => {
      console.log("deleted: ", deletedData);
      if (!err) {

          if (deletedData.deletedCount !== 0) {
              res.send({
                  message: "Product has been deleted successfully",
              })
          } else {
              res.send({
                  message: "No Product found with this id: " + id,
              })
          }


      } else {
          res.status(500).send({
              message: "server error"
          })
      }
  });
})










app.listen(port, () => {
    console.log(`listening started on port ${port}`)
  })

  
  const __dirname = path.resolve();
  app.get('/', express.static(path.join(__dirname, "/web/index.html")));
  app.use('/', express.static(path.join(__dirname, "/web")));


/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://malik:umermalik120@cluster0.3agpx4r.mongodb.net/malikdatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});



  
