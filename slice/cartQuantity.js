import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import baseUrl from '../helpers/baseUrl'
import {parseCookies} from 'nookies'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'



export const fetchAllQuantity = createAsyncThunk('cart/quantity', async(token)=>{
    return await fetch(`${baseUrl}/api/numberofproductincart`, 
    {
        headers:{
            "Authorization":token 
        }}
    ).then((res)=>res.json())
})

export const fetchQuantitySlice = createSlice({
    name: "quantity",
    initialState:{
        loading: false,
        error:'',
        cartQuantity: 0
    },

    extraReducers:{
        
        [fetchAllQuantity.pending]:(state, {payload})=>{
            state.loading = true
        },
        [fetchAllQuantity.fulfilled]:(state, {payload})=>{
            console.log('payload',payload);
            if(payload.error == "you must logged in"){
                state.error = payload.error
                state.cartQuantity = 0;
                return;
            }
            state.loading = false
            state.cartQuantity = payload

        },
        [fetchAllQuantity.rejected]:(state, {payload})=>{
            console.log('error logged');
            state.loading = false
            state.cartQuantity = 0
            state.error = 'some error in fetching'
        }
    }



})

export default fetchQuantitySlice.reducer
