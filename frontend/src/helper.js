import { redirect } from "react-router-dom";

export function getAuthToken(){
    return localStorage.getItem('token');
}

export function storeData(data){
    const token = data.token
    const name = data.user.username
    const email = data.user.email
    const id = data.user.id
    const role = data.user.role.role
    localStorage.setItem('token',token)
    localStorage.setItem('username',name)
    localStorage.setItem('email',email)
    localStorage.setItem('id',id)
    localStorage.setItem('role',role)
}

export function getUserData(key){
    return localStorage.getItem(key)
}

export function clearData(){
    return localStorage.clear()
}
export function isAuthenticated(){
    const token = localStorage.getItem('token')
    if(!token){
        return redirect('/notlogin')
    }
    return true
}

export function isAdmin(){
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    if( token && role==='admin' ){
       return true
    }
    return redirect('/unauthorized')
}

export function isAdminUser(){
    if(getAuthToken() && getUserData('role')==='admin'){
        return true
    }
    else{
        return false
    }
}

export function formatDateOnly(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }