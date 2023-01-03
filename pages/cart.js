import baseUrl from '../helpers/baseUrl'
import { parseCookies} from 'nookies'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { fetchAllQuantity } from '../slice/cartQuantity'

const Cart = ({error, products}) => {
  const {token, user} =  parseCookies()
    const router = useRouter()
    const [cProducts,setCartProduct] = useState(products)
    const dispatch = useDispatch()

    let email = JSON.parse(user).email
    let price = 0

    if(!token){
      return(
          <div className="center-align">
              <h3>please login to view your cart</h3>
              <Link href="/login"><a><button className="btn #1565c0 blue darken-3">Login</button></a></Link>
          </div>
      )
  }
  if(error){
    M.toast({html:error,classes:"red"})
    cookie.remove("user")
    cookie.remove("token")
    router.push('/login')

}

const handleRemove = async (pid)=>{
  const res = await fetch(`${baseUrl}/api/cart`,{
        method:"DELETE",
        headers:{
           "Content-Type":"application/json",
           "Authorization":token 
        },
        body:JSON.stringify({
            productId:pid
        })
    })
    const res2 =  await res.json()
    setCartProduct(res2)
    if(res2){
       dispatch(fetchAllQuantity(token))
    }
 }


let handleCheckout2 =  ()=>{
    try {
         fetch(`${baseUrl}/api/payment/`,{
            method:"POST",
            headers:{
               "Content-Type":"application/json",
              "Authorization":token 
            },
            body:JSON.stringify({
                cartItems: cProducts,
                email: email
            })
        }).then((res) => res.json()).then((response)=>{
            console.log(response);
            if (response.url) {
                if(typeof window !==  undefined){
                    window.location.href = response.url;
                }
              
            }
        })
       
    } catch (error) {
        console.log(error);
    }
   
}
const CartItems = ()=>{

  return(
      <>
        {cProducts?.map(item=>{
          price = price + item.quantity * item.product.price
            return(
                <>
                <div style={{display:"flex",margin:"20px"}} key={item._id}>
                    <img src={item.product.mediaUrl} style={{width:"30%"}}/>
                    <div style={{marginLeft:"20px"}}>
                        <h6>{item.product.name}</h6>
                        <h6>{item.quantity} x  ₹ {item.product.price}</h6>
                        <button className="btn red" onClick={()=>{handleRemove(item.product._id)}}>remove</button>
                    </div>
                </div>
                
                </>
            )
        })}
      </>
  )
}






const TotalPrice = ()=>{
    return(
        <div className="container" style={{display:"flex",justifyContent:"space-between"}}>
            <h5>Total ₹ {price}</h5>
            {products.length != 0
            && 
            <button className="btn" onClick={()=>handleCheckout2()}>Checkout</button>
            }
          
        </div>
    )
}


if(cProducts?.length == 0){
    return (
        <div className="container" >
            <h4>You haven&apos;t added anything in your cart</h4>
            <button className="btn waves-effect waves-light #ee6e73 pink accent-3 " onClick={()=>router.push("/")} > Add items 
            <i className="material-icons right">add</i>
          </button>
        </div>
    )
}



  return (
    <div> {CartItems()}{TotalPrice()}</div>
  )
}

export default Cart

export async function getServerSideProps(ctx){
  const {token} = parseCookies(ctx)
  if(!token){
      return {
          props:{products:[]}
      }
  }
  const res =  await fetch(`${baseUrl}/api/cart`,{
      headers:{
          "Authorization":token 
      }
  })
  const products =  await res.json()
  if(products.error){
      return{
          props:{error:products.error}
      }
  }
 return {
      props:{products}
  }
}