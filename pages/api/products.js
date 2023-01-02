// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initDB from "../../helpers/initDB"
import Product from "../../models/Product"

initDB()

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res)
      break;
      case "POST":
      await addProduct(req, res)
      break;

  }
  // res.status(200).json({ name: 'John Doe' })
}


const getAllProducts = async(req, res) =>{
  try {
  Product.find().then(products=>{
    res.status(200).json(products)
  })
} catch (error) {
  res.status(500).json({error:'Internal server error'})
}
}
const addProduct = async(req, res) =>{

  const {name, price, description, mediaUrl} = req.body
try {
  if(!name || !price || !description || !mediaUrl){
   return res.status(422).json({error:"Please add all the fields"})
  }
const new_product = await new Product({
  name,
  price, 
  description,
  mediaUrl
}).save()
res.status(201).json(new_product)
} catch (error) {
  res.status(500).json({error:'Internal server error'})
}
}