import React, { Component } from 'react'
import axios from 'axios'
import ProductList from './ProductList'
import ProductForm from './ProductForm'

class Summary extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      categories: []
    }
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
    this.onSaveHandler = this.onSaveHandler.bind(this)
  }

  componentDidMount() {
    axios.get('/api/products')
    .then(response=> response.data)
    .then(products=> this.setState({ products }))

    axios.get('/api/categories')
    .then(response=> response.data)
    .then(categories=> this.setState({ categories }))
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
    let { products, categories } = this.state
    if (prod.id) {
      prod.categoryId = prod.categoryId != 0 ? prod.categoryId : null
      return axios.put(`/api/products/${prod.id}`, prod)
      .then(response=> {
        categories.forEach(cat=> {
          cat.products = cat.products.filter(p=> p.id != prod.id)
        })
        const cat = categories.find(cat=> cat.id == prod.categoryId)
        if (cat) cat.products.push(prod)
        this.setState({ categories })
      })
    }
    else {
      prod.categoryId = prod.categoryId || null
      return axios.post('api/products', prod)
      .then(response=> response.data)
      .then(_prod=> {
        products = [ ...products, _prod ]
        if (prod.categoryId) {
          categories.find(cat=> cat.id == prod.categoryId).products.push(_prod)
        }
        this.setState({ products, categories })
      })
    }
  }

  render() {
    const { products, categories } = this.state
    const { onDeleteHandler, onSaveHandler } = this

    const mostExpensive = products.map(prod=> prod).sort((a, b)=> a.price < b.price)[0]
    const notInStock = products.filter(prod=> !prod.inStock).map(prod=> prod.name).join(' ')

    return (
      <div>
        <div className='col-6 col-md-6'>
          <ProductList products={ products }
            categories={ categories }
            onSaveHandler={ onSaveHandler } 
            onDeleteHandler={ onDeleteHandler } />
        </div>

        <div className='col-3 col-md-3'>
          <div className='col-12 col-md-12'>
          <h4>Add Product</h4>
          <ProductForm 
            onSaveHandler={ onSaveHandler }
            categories={ categories }/>
          </div>
        </div>

        <div className='col-3 col-md-3'>
          <div className='col-12 col-md-12'>
            <div className='card'>
            There are { products.length } products
            <hr/>
            {
              categories.map(category=> (
                <li key={ category.id }>{ category.name } has { category.products.length } products.</li>
              ))
            }
            <hr/>
            <p>{ products.length ? <span>The most expensive product is { mostExpensive.name } at { mostExpensive.price }</span> : null }</p>
            { notInStock.length ? <span>Products not in stock are { notInStock }</span> : null }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Summary
