import React from 'react'
import ProductForm from './ProductForm'

const ProductList = (props) => {
  const { products, onDeleteHandler, onSaveHandler } = props

  return (
    <div>
    {
      products.map(product=> (
        <ProductForm
          product={product}
          key={ product.id }
          onSaveHandler={ onSaveHandler }
          onDeleteHandler={ onDeleteHandler }/>
      ))
    }
    </div>
  )
}

export default ProductList
