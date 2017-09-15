import React, { Component } from 'react'
import ProductForm from './ProductForm'
import axios from 'axios'

class ProductList extends Component {
  constructor() {
    super()
  }

  render() {
    const { products, onDeleteHandler, onSaveHandler } = this.props

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
}

export default ProductList
