import { redirect } from "react-router-dom";

export function getAuthToken(){
    return localStorage.getItem('token');
}

export function storeData(data){
    const token = data.jwt
    const name = data.user.username
    const email = data.user.email
    const id = data.user.id
    localStorage.setItem('token',token)
    localStorage.setItem('username',name)
    localStorage.setItem('email',email)
    localStorage.setItem('id',id)
}

export function getUserData(key){
    return localStorage.getItem(key)
}

export function clearData(){
    return localStorage.clear()
}
export function checkAuth(){
    const token = localStorage.getItem('token')
    if(!token){
        return redirect('/login')
    }
    return true
}