import React, { Component } from 'react'
import axios from 'axios'
import ProductList from './ProductList'
import ProductForm from './ProductForm'

class Summary extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
    this.onSaveHandler = this.onSaveHandler.bind(this)
  }

  componentDidMount() {
    axios.get('/api/products')
    .then(response=> response.data)
    .then(products=> this.setState({ products }))
  }

  onDeleteHandler(ev) {
    ev.preventDefault()
    console.log('deleting!');
  }

  onSaveHandler(prod) {
    // update or save
    if (prod.id) console.log('updating!');
    else console.log('creating!');
  }

  render() {
    const { products } = this.state
    const { onDeleteHandler, onSaveHandler } = this

    return (
      <div>
        <ProductList products={ products } onSaveHandler={ onSaveHandler } onDeleteHandler={ onDeleteHandler } />
        Add Product
        <ProductForm onSaveHandler={ onSaveHandler }/>

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
