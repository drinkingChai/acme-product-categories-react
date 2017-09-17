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
    console.log(product)
 
    const { categories, products } = this.state

    // all of this after axios
    return axios.post('/api/products', product)
    .then(response=> response.data)
    .then(prod=> {
      const category = categories.find(c=> c.id == prod.categoryId)
      if (category) category.products.push(prod)
      products.push(prod)

      this.setState({ categories, products })
    })
  }

  updateHandler(product) {
    console.log('updated!')

    let { categories, products } = this.state

    // after axios
    product.categoryId = product.categoryId * 1 ? product.categoryId : null
    return axios.put(`/api/products/${product.id}`, product)
    .then(response=> response.data)
    .then(()=> {
      categories = categories.map(category=> {
      category.products = category.products.filter(prod=> prod.id != product.id)
        return category
      })
      const category = categories.find(c=> c.id == product.categoryId)
      if (category) category.products.push(product)
      const index = products.findIndex(prod=> prod.id == product.id)
      products[index] = product

      this.setState({ categories, products }) 
    })
  }

  deleteHandler(product) {
    console.log('deleted!')
    console.log(product)

    let { categories, products } = this.state

    // axios
    return axios.delete(`/api/products/${product.id}`)
    .then(response=> response.data)
    .then(()=> {
      products = products.filter(prod=> prod.id != product.id)
      categories = categories.map(category=> {
        category.products = category.products.filter(prod=> prod.id != product.id)
        return category
      })

       this.setState({ categories, products })
    })
  }

  render() {
    const { products, categories } = this.state
    const { createHandler, updateHandler, deleteHandler } = this
    const mostExpensive = products.map(p=> p).sort((a, b)=> a.price < b.price)[0]
    const noCat = products.filter(p=> !(p.categoryId * 1)) // wont need *1 after axios
    const notInStock = products.filter(p=> !(p.inStock * 1))

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
          { notInStock.length ? <p>Products not in stock are { notInStock.map(p=> p.name).join(' ') }</p> : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Summary
