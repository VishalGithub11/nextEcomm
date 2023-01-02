import Cart from "../../../models/Cart";
import Product from "../../../models/Product"


export default async (req, res) =>{
    console.log('req.body', req.body);
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;

    }
}

const getProduct = async(req, res)=>{
    const {pid} = req.query
    const product =  await Product.findOne({_id:pid})
    res.status(200).json(product)
}

const deleteProduct = async(req, res)=>{
    const {pid} = req.query
    await Cart.updateMany({$pull:{products:{product:pid}}})
    await Product.findByIdAndDelete({_id:pid})
    res.status(200).json({})
}