import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY = gql`
query ($category_name:String!,){
  products(filters: { category: { category_name: { eq: $category_name } } }) {
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
export const GET_PRODUCT_BY_ID = gql`
query($id:ID!){
  product(id:$id){
    data{
      attributes{
        name
        description
        old_price
        new_price
        image{
          data{
            attributes{
              url
            }
          }
        }
        category{
          data{
            attributes{
              category_name
            }
          }
        }
      }
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
mutation($identifier:String!,$password:String!){
  login(input:{
    identifier:$identifier
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
query($id:ID!){
  carts(filters:{
    users_permissions_user:{
      id:{
        eq:$id
      }
    }
  }){
    data{
      attributes{
        products{
          data{
            id
            attributes{
              name
              new_price
              description
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
    }
  }
}
`