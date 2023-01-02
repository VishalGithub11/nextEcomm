import Link from 'next/link';
import {useRouter} from 'next/router'
import React, { useEffect, useState } from 'react'

const Payment_sucess = () => {

  const [sec, setSec] = useState(5)
  const router = useRouter();

  useEffect(()=>{
    if(sec>0){
      setTimeout(()=>{
        setSec(sec - 1)
      }, 1000)
    }
  },[sec])

  useEffect(()=>{
    if(sec == 0){
      router.push('/')
    }
  },[sec])

  return (
    
<div className="row">
    <div className="col s10 m6">
      <div className="card blue-grey darken-1 success_card">
        <div className="card-content white-text">
          <span className="card-title">Payment Successfull</span>
          <p>You will be redirect to Homepage within <span className='sec'> {sec}</span> {sec > 1 ? "seconds" : "second" } </p>
        </div>
        <div className="card-action">
         <Link href="/"><a>homepage</a></Link>
         <Link href="/cart"><a>cart</a></Link>

         
        </div>
      </div>
    </div>
  </div>

     
      
  )
}

export default Payment_sucess