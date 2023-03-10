import { parseCookies } from 'nookies';
import {useState} from 'react'
import baseUrl from '../helpers/baseUrl'
// import  FadeLoader  from 'react-spinners/FadeLoader';
import {useRouter} from "next/router"
// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
//   top:"150px"
// };

const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter()

 

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      setLoading(true)
     const mediaUrl =  await imageUpload()
    const res =  await fetch(`${baseUrl}/api/products`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        price,
        mediaUrl,
        description
      })
    })
    const res2 = await res.json()
    if(res2.error){
      setLoading(false)
      M.toast({html: res2.error,classes:"red"})
    }else{
      setLoading(false)
      M.toast({html: "Product saved",classes:"green"})
      router.push("/")
    }
    }catch(err){
      setLoading(false)
      console.log(err)
    }

  }
  
  const imageUpload = async ()=>{
       const data =  new FormData()
       data.append('file',media)
       data.append('upload_preset',"ecomm_next")
       data.append('cloud_name',"dfdxz6jkp")
       const res = await fetch("https://api.cloudinary.com/v1_1/dfdxz6jkp/image/upload",{
         method:"POST",
         body:data
       })
       const res2  = await res.json()
       return res2.url
  }

 


  return (
    <div className="container" >
      {/* <FadeLoader
      color="red"
        loading={loading}
        cssOverride={override} /> */}
    
    <form onSubmit={(e)=>handleSubmit(e)}>
         <input type="text" name="name" placeholder="Name" 
         value={name} 
         onChange={(e)=>{setName(e.target.value)}}
         />
         <input type="text" name="price" placeholder="Price" 
         value={price} 
         onChange={(e)=>{setPrice(e.target.value)}}
         />
         <div className="file-field input-field">
          <div className="btn #1565c0 blue darken-3">
            <span>File</span>
            <input type="file" 
              accept="image/*"
              onChange={(e)=>setMedia(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
         <img className="responsive-img" src={media?URL.createObjectURL(media):""} />
        <textarea name="description" 
        placeholder="Description"
         value={description} 
         onChange={(e)=>{setDescription(e.target.value)}}
         className="materialize-textarea" ></textarea>
          <button className="btn waves-effect waves-light #1565c0 blue darken-3 fullTextButton" type="submit"> {loading ? "Submitting Wait..." : "Submit" }
            <i className="material-icons right">send</i>
          </button>
     </form>
     </div>
  )
}

export default Create

export async function getServerSideProps(ctx){
  const cookie = parseCookies(ctx)
 const user = cookie.user ? JSON.parse(cookie.user) : ""

  if(user.role !== 'admin'){
    const {res} = ctx
    res.writeHead(302, {Location:'/'})
    res.end()
  }
  return {
    props: {}
  }
}