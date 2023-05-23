import axios from "axios"
import { encryptStorage1 } from "../utility/Storage";
import { allUserDataHeaders } from "../functions/Function";

let token=encryptStorage1.getItem('token')
console.log(token);

export const userLogin=async (loginData)=>{
    try {
        let res=await axios ({
            method:"post",
            url:`${process.env.REACT_APP_API_ENDPOINT}login`,
            data:loginData,
            headers:{ 'Content-Type':'application/json','Accept':'application/json' }
        })

        return res
    } catch (error) {
        return error
    }
}


export const getAllUserData=async ()=>{
    try {
        let res=await axios ({
            method:"get",
            url:`${process.env.REACT_APP_API_ENDPOINT}users`,
            headers:allUserDataHeaders
        
        })

        return res
    } catch (error) {
        return error
    }
}