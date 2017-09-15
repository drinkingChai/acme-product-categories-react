import React, { Component } from 'react'
import ProductForm from './ProductForm'
import axios from 'axios'

class ProductList extends Component {
  constructor() {
    super()
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  }

  onDeleteHandler(ev) {
    ev.preventDefault()
    console.log('deleting!');
  }

  render() {
    const { products } = this.props
    const { onDeleteHandler } = this

    return (
      <div>
      {
        products.map(product=> (
          <ProductForm
            product={product}
            key={ product.id }
            onDeleteHandler={ onDeleteHandler }/>
        ))
      }
      </div>
    )
  }
}

export default ProductList
