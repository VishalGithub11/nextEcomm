import { useRef, useEffect } from "react";
import baseUrl from "../../helpers/baseUrl";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie2 from 'js-cookie'
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { fetchAllQuantity } from "../../slice/cartQuantity";
// import M from 'materialize-css'


const Product = ({ product }) => {
  const [quantity,setQuantity] = useState(1)
  const modalRef = useRef(null);
  const cookie = parseCookies();
  let user = cookie.user ? JSON.parse(cookie.user) : "";
  const dispatch = useDispatch()

  const router = useRouter();
  const token = cookie.token

  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  if (router.isFallback) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  const getModals = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure want to delete this ?</p>
        </div>
        <div className="modal-footer">
          <a
            className="modal-close waves-effect waves-light btn #f44336 red"
            onClick={() => deleteProduct()}
          >
            YES
          </a>
          <a className="modal-close waves-effect waves-light btn #757575 grey darken-1">
            No
          </a>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    router.push("/");
    if(data){
      dispatch(fetchAllQuantity(token))
    }
  };

  const AddToCart = async ()=>{
    const res =  await fetch(`${baseUrl}/api/cart`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":cookie.token
      },
      body:JSON.stringify({
       quantity,
       productId:product._id
      })
    })
    
  const res2 = await res.json()
  if(res2){
    dispatch(fetchAllQuantity(token))
  }
  console.log('res2', res2);
  if(res2.error){
     M.toast({html:error,classes:"red"})
     cookie2.remove("user")
     cookie2.remove("token")
     router.push('/login')
  }
  M.toast({html:res2.message,classes:"green"})

  }

  return (
    <div className="">
      <div className="card">
        <div className="card-image">
          <img src={product.mediaUrl} />
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>{product.description}</p>
        </div>
        <hr />
        <div className="card-content #ffca28-text amber-text lighten-1">
          <p>&#x20B9; {product.price}</p>
          <div style={{ display: "grid", gridTemplateColumns: "40% 30% 30%" }}>
            <input
            min="1"
            value={quantity}
            onChange={(e)=>setQuantity(Number(e.target.value))}
            placeholder="Qunatity"
             type="number"
            />
            <span></span>{" "}
            {user ? <a className="btn waves-effect #4caf50 green fullTextButton" onClick={()=> AddToCart()}>
             Add-to-Cart
            </a> : 
            <a className="btn waves-effect #4caf50 green fullTextButton" onClick={()=> router.push('/login')}>
             Login-to-add
            </a>
            }
          </div>

          {(user.role === "admin" || user.role === "root") && (
            <>
              <a
                data-target="modal1"
                className="btn modal-trigger waves-effect waves-light btn #f44336 red"
              >
                Delete
              </a>
            </>
          )}
          {getModals()}
        </div>
      </div>
    </div>
  );
};

export default Product;

export async function getServerSideProps({params}){

    const productId = params.id
    const response = await fetch(`${baseUrl}/api/product/${productId}`)
    const data = await response.json()

    return{
        props:{
            product: data
        }
    }
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: { id: "62e3e783240b8ee54290e1bb" },
//       },
//     ],
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   const productId = params.id;
//   const response = await fetch(`${baseUrl}/api/product/${productId}`);
//   const data = await response.json();

//   return {
//     props: {
//       product: data,
//     },
//   };
// }
