import axios from "axios"
import { allUserDataHeaders } from "../functions/Function";


export const registerUser=async (registerUserData)=>{
    try {
        let res=await axios ({
            method:"post",
            url:`${process.env.REACT_APP_API_ENDPOINT}register`,
            data:registerUserData,
            headers:{ 'Content-Type':'application/json','Accept':'application/json' }
        })

        return res
    } catch (error) {
        throw error
    }
}

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
        throw error
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

export const selectedUserData=async ()=>{
    try {
        let res=await axios ({
            method:"get",
            url:`${process.env.REACT_APP_API_ENDPOINT}users/66`,
            headers:allUserDataHeaders
        
        })
        console.log(res);
        return res
    } catch (error) {
        return error
    }
}

export const deleteUser=async (id)=>{
    try {
        let res=await axios ({
            method:"DELETE",
            url:`${process.env.REACT_APP_API_ENDPOINT}users/${id}`,
            headers:allUserDataHeaders
        })
        
        return res
    } catch (error) {
        return error
    }
}

export const updateUser=async (updateUserData,id)=>{
    try {
        let res=await axios ({
            method:"PUT",
            url:`${process.env.REACT_APP_API_ENDPOINT}users/${id}`,
            data:updateUserData,
            headers:allUserDataHeaders
        })
        
        return res
    } catch (error) {
        return error
    }
}

export const selfUser=async ()=>{
    try {
        let res=await axios ({
            method:"get",
            url:`${process.env.REACT_APP_API_ENDPOINT}me`,
            headers:allUserDataHeaders
        })
        
        return res
    } catch (error) {
        return error
    }
}


export const selfProfileChange=async (personaData)=>{
    try {
        let res=await axios ({
            method:"PUT",
            url:`${process.env.REACT_APP_API_ENDPOINT}change-profile`,
            data:personaData,
            headers:allUserDataHeaders
        })
        
        return res
    } catch (error) {
        return error
    }
}

export const passwordChange=async (passwordData)=>{
    try {
        let res=await axios ({
            method:"PUT",
            url:`${process.env.REACT_APP_API_ENDPOINT}change-password`,
            data:passwordData,
            headers:allUserDataHeaders
        })
        
        return res
    } catch (error) {
        return error
    }
}

