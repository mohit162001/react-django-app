import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY = gql`
query($category_Name:String!){
  products(category_Name:$category_Name){
		edges{
      node{
 				id
        name
        price
        image
        category{
          name
        }
      }
    }
  }
}
`
export const GET_CATEGORIRS = gql`
query{
  categories{
    id
    name
  }
}
`

export const GET_PRODUCT_BY_ID = gql`
query($productId:String!){
  product(productId:$productId){
    productId
    productName
    productDesc
    productPrice
    productImage
    productCategory
  }
}
`

export const GET_POPULAR_PRODUCT = gql`
query{
  products(filters: {popular:{ eq: true }}) {
    data {
      id
      attributes {
        name
        old_price
        new_price
        image{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
`

export const GET_NEW_COLLECTION = gql`
query{
  newProducts{
    id
    name
    image
    price
  }
}
`
export const USER_LOGIN = gql`


mutation($username:String!,$password:String!){
	userLogin(username:$username password:$password){
    token
    user
    {
      id
      username
			email
      address
      role {
        id
        role
      }
    }
    message
  }
}
`
export const USER_REGISTRATION = gql`
mutation($username:String!,$email:String!,$password:String!){
  register(input:{
    username:$username,
    email:$email,
    password:$password
  }){
    jwt
    user{
      id
      username
      email
    }
  }
}
`
export const GET_USER_DETAILS = gql`
query($userId:String!){
  userDetails(userId:$userId){
    username
    password
    address
    email
    role{
      role
    }
  }
}
`
export const UPDATE_USER_DETAILS = gql`
mutation($username:String! $email:String! $address:String $userId:String!){
  userUpate(userId:$userId username:$username email:$email address:$address ){
    message
  }
}
`

export const GET_CART_DETAILS = gql`
query($userId:String!){
  userCart(userId:$userId){
    productId
    productName
    productImage
    productPrice
    totalPrice
    quantity
  }
}
`

export const ADD_ITEM_TO_CART = gql`
mutation($userId:String!,$productId:String!){
  cartItemAdd(userId:$userId ,productId:$productId){
    message
  }
}
`
export const REMOVE_CART_ITEM = gql`
mutation($userId:String!,$productId:String!){
  cartItemRemove(userId:$userId ,productId:$productId){
    message
  }
}
`
export const GET_ORDERS_DETAILS = gql`
query($userId:String!){
  userOrders(userId:$userId){
    username
    productId
    productName
    productImage
    productPrice
    totalPrice
    quantity
    orderDate
    paymentMode
  }
}
`