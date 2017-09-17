import React, { Component } from 'react'
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import axios from 'axios'

class Summary extends Component {

  constructor() {
    super()
    this.state = {
      products: [],
      categories: []
    }
    this.createHandler = this.createHandler.bind(this)
    this.updateHandler = this.updateHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  } 

  componentDidMount() {
    Promise.all([
      axios.get('/api/products'),
      axios.get('/api/categories')
    ])
    .then(([res1, res2])=> [res1.data, res2.data])
    .then(([products, categories])=> {
      this.setState({ products, categories })
    })
  }

  createHandler(product) {
    console.log('created!')
  }

  updateHandler(product) {
    console.log('updated!')
  }

  deleteHandler(product) {
    console.log('deleted!')
  }

  render() {
    const { products, categories } = this.state
    const { createHandler, updateHandler, deleteHandler } = this
    const mostExpensive = products.map(p=> p).sort((a, b)=> a.price < b.price)[0]
    const noCat = products.filter(p=> !p.categoryId)

    return (
      <div>
        <div className='col-6 col-md-6'>
          <ProductList 
            products={ products } 
            categories={ categories }
            updateHandler={ updateHandler }
            deleteHandler={ deleteHandler }/>
        </div>

        <div className='col-3 col-md-3'>
          <div className='col-12 col-sm-6'>
            <ProductForm 
              categories={ categories }
              createHandler={ createHandler }/>
          </div>
        </div>

        <div className='col-3 col-md-3'>
          <div className='col-12 col-sm-6'>
          There are { products.length } products
          <hr/>
          {
            categories.map(cat=> <p key={ cat.id }>{ cat.name } has { cat.products.length } prodcuts.</p>)
          }
          { noCat.length ? <p>{ noCat.length } product(s) have no categories.</p> : null }
          <hr/>
          { products.length ? <p>The most expensive product is { mostExpensive.name } at { mostExpensive.price }</p> : null } 
          </div>
        </div>
      </div>
    )
  }
}

export default Summary
