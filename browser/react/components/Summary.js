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

  onDeleteHandler(prod) {
    let { products } = this.state
    console.log('deleting!');
    console.log(prod.id);
    axios.delete(`/api/products/${prod.id}`)
    .then(response=> response.data)
    .then(()=> {
      products = products.filter(product=> product.id != prod.id)
      this.setState({ products })
    })
  }

  onSaveHandler(prod) {
    // update or save
    let { products } = this.state
    if (prod.id) {
      axios.put(`/api/products/${prod.id}`, prod)
      .then(response=> {
        const index = products.findIndex(p=> p.id == prod.id)
        products[index] = prod
        this.setState({ products })
      })
    }
    else {
      prod.categoryId = prod.categoryId || null
      axios.post('api/products', prod)
      .then(response=> {
        products = [ ...products, prod ]
        this.setState({ products })
      })
    }
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
