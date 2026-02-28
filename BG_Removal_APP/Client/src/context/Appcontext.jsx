import { useState } from "react";
import {useAuth} from '@clerk/clerk-react'
import { createContext } from "react";
import axios from "axios";
import {toast} from 'react-tostify'
export const Appcontext=createContext()
const Appcontextprovider=(props)=>{
    const[credit,setCredit]=useState(false)
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const {getToken}=useAuth()
    const loadCreditsData=async()=>{
  try {
    const token=await getToken()
    const {data}=await axios.get(backedUrl+'/api/user/credits',{headers:{token}})
    if(data.success){
        setCredit(data.credits)
        console.log(data.credits)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }

    }
    const value={
        credit,setCredit,
        loadCreditsData,backendUrl

    }
    return(
        <Appcontext.Provider value={value}>
            {props.children}
</Appcontext.Provider>
    )
}
export default Appcontextprovider