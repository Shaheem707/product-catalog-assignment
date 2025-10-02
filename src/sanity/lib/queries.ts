export const allProductsQuery = `*[_type == "product"]{
  _id,
  title,
  description,
  image,
  category,
  price,
  availability,
  slug
}`