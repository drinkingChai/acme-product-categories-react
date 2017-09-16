import React from 'react'
import ProductForm from './ProductForm'

const ProductList = (props) => {
  const { products, categories, onDeleteHandler, onSaveHandler } = props

  return (
    <div>
    {
      products.map(product=> (
        <div className='col-4 col-md-4' key={ product.id }>
          <ProductForm
            product={product}
            categories={categories}
            onSaveHandler={ onSaveHandler }
            onDeleteHandler={ onDeleteHandler }/>
        </div>
      ))
    }
    </div>
  )
}

export default ProductList
