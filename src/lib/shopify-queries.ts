// Shared cart selection. Every cart mutation returns the same fields so the
// client can keep its checkout link and `merchandiseId -> lineId` map fresh.
const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 250) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
            }
            image {
              url
              altText
            }
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
  cost {
    totalAmount {
      amount
      currencyCode
    }
  }
`;

export const GET_ALL_PRODUCTS = `
  query GetAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          collections(first: 3) {
            edges {
              node {
                title
                handle
              }
            }
          }
          tags
          publishedAt
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      collections(first: 3) {
        edges {
          node {
            title
            handle
          }
        }
      }
      tags
      publishedAt
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle(
    $handle: String!, 
    $first: Int!
  ) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            tags
            publishedAt
          }
        }
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS = `
  query GetAllCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART = `
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation AddToCart(
    $cartId: ID!, 
    $lines: [CartLineInput!]!
  ) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Needs the cart *line* id (from the line map), not the variant id.
// cartLinesUpdate takes CartLineUpdateInput, which is a different type from
// the CartLineInput used by cartCreate / cartLinesAdd.
export const UPDATE_CART_QUANTITY = `
  mutation UpdateCartQuantity(
    $cartId: ID!, 
    $lines: [CartLineUpdateInput!]!
  ) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_FROM_CART = `
  mutation RemoveFromCart(
    $cartId: ID!, 
    $lineIds: [ID!]!
  ) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;
