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
    edges{
      node{
      	name
      }
    }
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
export const USER_SIGNUP = gql`
mutation($username:String!,$password:String!,$email:String!){
  createUser(username:$username password:$password email:$email){
    token
    user{
      username
      email
      id
      role{
        role
      }
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
mutation($userId:String!,$productId:String!,$quantity:Int){
  cartItemAdd(userId:$userId ,productId:$productId,quantity:$quantity){
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
export const GET_ALL_ORDERS = gql`
query{
  orders{
    username
    orderDate
    productImage
    productName
    quantity
    totalPrice
    paymentMode    
  }
}
`

export const GET_PAYMENT_MODES = gql`
query{
  paymentMode{
    edges{
      node{
      	paymentMode
      }
    }
  }
}
`
export const CREATE_USER_ORDER = gql`
mutation($userId:String! $paymentMode:String!){
  orderCreate(userId:$userId paymentMode:$paymentMode){
    message
  }
}
`

export const CART_REMOVE_ALL = gql`
mutation($userId:String! ){
  cartRemoveAll(userId:$userId){
    message
  }
}
`

export const CREATE_PRODUCT = gql`
mutation($name:String! $desc:String! $price:Float! $image:String! $categoryName:String!){
  createProduct(name:$name desc:$desc price:$price image:$image categoryName:$categoryName ){
    message
  }
}
`
export const CREATE_CATEGORY = gql`
mutation($categoryName:String!){
  createCategory(name:$categoryName){
    message
  }
}
`