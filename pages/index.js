import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import baseUrl from '../helpers/baseUrl';

export default function Home({products}) {


const productList = products.map(product=>{
  return(
    <Link href={`product/${product._id}`} key={product._id} >
      
      <div className="card productLink" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl} />
          {/* <Image src={product.mediaUrl} width='250px' height='250px' placeholder='blur' blurDataURL={product.mediaUrl} alt="lap" /> */}
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>{product.description}</p>
        </div>
        <div className="card-action">
          <a href="#"> ₹  {product.price}</a>
        </div>
      </div>
      
      </Link>
  )
})


  return (
    <div className={styles.container}>
      <Head>
        <title>E-Comm Website</title>
        <meta name="description" content="Based on Next.JS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

      <div className='rootCard'>
        {productList}
      </div>


      </main>

      <footer className={styles.footer}>
       
        <a
          href="https://www.linkedin.com/in/modanwal11"
          target="_blank"
          rel="noopener noreferrer"
        >
           <div>
           Created By Vishal Modanwal{' '} 
          </div>
          <div>
          <span className={styles.logo}>
            <Image src="/logoF.png" alt="Vercel Logo" width={72} height={55} />
          </span>
          </div>
         
          
        </a>
      </footer>
    </div>
  )
}


// export async function getStaticProps(context){
//   const res = await fetch(`${baseUrl}/api/products`)

//   const data = await res.json();
//   return {
//     props:{
//         products:data
//     }
//   }
// }

export async function getServerSideProps(){
  const res = await fetch(`${baseUrl}/api/products`)

  const data = await res.json();
  return {
    props:{
        products:data
    }
  }
}