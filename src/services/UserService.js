import axios from "axios"

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