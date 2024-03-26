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


export const GET_ALL_PRODUCTS = gql`
query{
  products{
    edges{
      node{
        id
        image
        name
        price
        desc
        insertedDate
        category{
          name
        }
      }
    }
  }
}
`
export const UPDATE_PRODUCT_DETAILS = gql`
mutation($productId:String! $name:String! $desc:String! $price:Float $image:String $categoryName:String!){
  updateProduct(productId:$productId name:$name desc:$desc price:$price image:$image categoryName:$categoryName  ){
    product{
      name
    }
  }
}
`

export const DELETE_PRODUCT = gql`
mutation($productId:String!){
  deleteProduct(productId:$productId){
    message
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
export const GET_POPULAR_PRODUCT = gql`
query($category_Name:String!){
  popularProduct(category_Name:$category_Name){
   edges{
    node{
      name
      id
      insertedDate
      price
      image
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
    orderId
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
    orderId
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
export const DELETE_ORDER = gql`
mutation($orderId:String!){
  orderDelete(orderId:$orderId){
    message
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