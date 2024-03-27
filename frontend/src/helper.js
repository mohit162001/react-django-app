// import { redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';

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

export  function isAuthenticated() {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (token && role === 'user') {
        console.log('authenticated');
        return true;
    } else {
        console.log('unauthenticated');
        return false;
    }
}

export  function isAdmin() {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (token && role === 'admin') {
        return true;
    } else {
        return false;
    }
}

export  function isAdminUser() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
        return true;
    } else {
        return false;
    }
}




// export function isAuthenticated(){
//     const role = localStorage.getItem('role')
//     const token = localStorage.getItem('token')
//     if(token && role==='user'){
//         console.log('authenticated')
//         return true
//     }else{
//         console.log('unauthenticated')

//     return false
//     }
// }

// export function isAdmin(){
//     const role = localStorage.getItem('role')
//     const token = localStorage.getItem('token')
//     if( token && role==='admin' ){
//        return true
//     }
//     // return redirect('/unauthorized')
//     else{return false}
// }

// export function isAdminUser(){
//     if(getAuthToken() && getUserData('role')==='admin'){
//         return true
//     }
//     else{
//         return false
//     }
// }



// export function isAuthenticated() {
//     const token = localStorage.getItem('token');
//     const history = useHistory();

//     if (!token) {
//         history.push('/login');
//         return false;
//     }
//     return true;
// }

// export function isAdmin() {
//     const role = localStorage.getItem('role');
//     const token = localStorage.getItem('token');
//     const history = useHistory();

//     if (token && role === 'admin') {
//         return true;
//     }
//     history.push('/unauthorized');
//     return false;
// }
