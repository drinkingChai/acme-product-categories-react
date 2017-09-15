import React, { Component } from 'react'
import axios from 'axios'
import ProductList from './ProductList'
import ProductForm from './ProductForm'

class Summary extends Component {
  constructor() {
    super()
    this.state = { products: [] }
  }

  componentDidMount() {
    axios.get('/api/products')
    .then(response=> response.data)
    .then(products=> this.setState({ products }))
  }

  render() {
    const { products } = this.state

    return (
      <div>
        <ProductList products={ products } />
        Add Product
        <ProductForm />

        <div>
          There are { products.length } products
          {

          }
        </div>
      </div>
    )
  }
}

export default Summary
