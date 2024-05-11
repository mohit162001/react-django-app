import React from 'react'
import { GET_USER_DETAILS } from '../query/query'
import { useQuery } from '@apollo/client'
import { getUserData } from '../helper'
import UserDetails from '../Component/UserDetails/UserDetails'

function UserProfilePage() {
    const userId = getUserData('id')
    const {data,error,loading} = useQuery(GET_USER_DETAILS,{variables:{
        userId:userId
    }})
    
  return (
    <>
     {error && <p className='user-fallback'>Something went wrong...!</p>}
     {loading && !error && <p className='user-fallback'>Loading user details...</p>}
     {data && <UserDetails username={data.userDetails.username} address={data.userDetails.address} email={data.userDetails.email} userId={userId} image={data.userDetails.image}/>}
    </>
  )
}

export default UserProfilePage