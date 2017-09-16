import React from 'react'
import ProductForm from './ProductForm'

const ProductList = (props) => {
  const { products, onDeleteHandler, onSaveHandler } = props

  return (
    <div className='col-6 col-md-6'>
    {
      products.map(product=> (
        <div className='col-4 col-md-4' key={ product.id }>
          <ProductForm
            product={product}
            onSaveHandler={ onSaveHandler }
            onDeleteHandler={ onDeleteHandler }/>
        </div>
      ))
    }
    </div>
  )
}

export default ProductList
