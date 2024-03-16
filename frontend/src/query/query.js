import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY = gql`
query($categoryId:String!){
  productByCategory(categoryId:$categoryId){
    id
    name
    price
    image
  }
}
`

export const GET_PRODUCT_BY_ID = gql`
query($productId:String!){
  product(productId:$productId){
    id
    name
    desc
    price
    image
    category{
      id
    }
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
  products(filters: {new_collection:{ eq: true }}) {
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
export const GET_CART_DETAILS = gql`
query($userId:String){
  cart(userId:$userId){
    id
    product{
      id
      name
      price
      image
    }
    price
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
  orderByUser(userId:$userId){
    product{
      name
      image
    }
    price
    quantity
    orderDate
    paymentMode{
      paymentMode
    }
  }
}
`