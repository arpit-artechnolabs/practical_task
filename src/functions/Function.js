import { encryptStorage1 } from "../utility/Storage"

export const LogOut = () => {
    encryptStorage1.removeItem('token')
    encryptStorage1.removeItem('userData')
    window.location.reload()
}


let token=encryptStorage1.getItem('token')
console.log(token);

export const allUserDataHeaders =
{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${token}`
}