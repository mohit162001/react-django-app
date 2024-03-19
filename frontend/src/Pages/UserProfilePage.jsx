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
     {data && <UserDetails username={data.userDetails.username} address={data.userDetails.address} email={data.userDetails.email} userId={userId}/>}
    </>
  )
}

export default UserProfilePage