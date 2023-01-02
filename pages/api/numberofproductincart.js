import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import Authenticated from '../../helpers/Authenticated'
import initDb from '../../helpers/initDB'


initDb()


export default async (req, res) => {
    await fetchUserCart(req,res)
}
const fetchUserCart = Authenticated(async (req,res) =>{
    const cart =  await Cart.findOne({user:req.userId})
                
    const totalCartQuantity = cart.products.map((item)=>{
        return (
            item.quantity )
    }).reduce((p, a)=>p+a,0)

    res.status(200).json(totalCartQuantity)
    
})


