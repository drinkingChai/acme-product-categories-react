import React from 'react'
import ProductForm from './ProductForm'

const ProductList = (props) => {

  const { products, 
          categories, 
          updateHandler, 
          deleteHandler } = props

  return (
    <div>
    {
      products.map(product=> (
        <div key={ product.id } className='col-4 col-md-6 col-sm-4'>
          <ProductForm
            product={ product }
            categories={ categories }
            updateHandler={ updateHandler }
            deleteHandler={ deleteHandler }/>
        </div>
      ))
    }
    </div>
  )
}

export default ProductList
