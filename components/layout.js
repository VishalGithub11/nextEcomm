import Head from "next/head"
import Navbar from "./navbar"
import Script from 'next/script'

export default function Layout  (props)  {
   
  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> </link>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </Head>

    <Navbar />

    {props.children}
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></Script>
    
</>
  )
}

