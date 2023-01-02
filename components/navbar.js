import Link from "next/link"
import {useRouter} from "next/router"
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import {useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { fetchAllQuantity } from "../slice/cartQuantity"
import logo from '../public/logo5.png'
import Image from "next/image"

const Navbar = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const cartNumbers = useSelector(state=>state.fetchQuantitySlice.cartQuantity)

  const cookieuser = parseCookies()
  let user  = cookieuser.user ? JSON.parse(cookieuser.user) : ""

  const token = cookieuser?.token
  
  function isActive(route){
    if(route === router.pathname){
      return 'active'
    }else{
      return ''
    }
  }

  useEffect(()=>{
    dispatch(fetchAllQuantity(token))
  },[])

  return (
    <nav>
    <div className="nav-wrapper">
      <Link href="/">
      <a  className="brand-logo left" style={{maxWidth:"58px"}}>
        <Image src={logo} 
        // height='64px'
        //  width='350px'
          /> 
        </a>
    
      </Link>
      {/* <Link href="/"> <a  className="brand-logo left"> LOGO </a>
    </Link> */}
      <ul id="nav-mobile" className="right 
      ">
      {( user.role === "admin" || user.role === 'root')  &&  <li  className={isActive('/create')}><Link href="/create"><a>Create</a></Link></li>}
{
  user ? 
  <>
  <li  className={isActive('/account')}><Link href="/account"><a>Account</a></Link></li>
  <li  className={isActive('/create')} onClick={()=>{
                  cookie.remove('token')
                  cookie.remove('user')
                  router.push('/login')
                }}><a>Logout</a></li>
  </>
  : <>
  <li className={isActive('/login')} > <Link href="/login"><a>Login</a></Link ></li>
        <li  className={isActive('/signup')}><Link href="/signup"><a>Sign up</a></Link></li>
  </>
}
<li  className={isActive('/cart')}> <Link href="/cart">
<a className="waves-effect waves-light red">
<i className="material-icons">shopping_cart</i>
            <span style={{ position: "absolute", left: "35px", top: "-12px" }}>
              {cartNumbers}
            </span>
          </a>
</Link></li>

      </ul>
    </div>
  </nav>
  )
}

export default Navbar



export async function getServerSideProps(ctx){
  const {token} = parseCookies(ctx)
  if(!token){
      return {
          props:{products:[]}
      }
  }
  const res =  await fetch(`${baseUrl}/api/numberofproductincart`,{
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