import React, { Component } from 'react'
import axios from 'axios'

class Summary extends Component {

  constructor() {
    super()
    this.state = {
      products: [],
      categories: []
    }
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

  render() {
    const { products, categories } = this.state
    const mostExpensive = products.map(p=> p).sort((a, b)=> a.price < b.price)[0]
    const noCat = products.filter(p=> !p.categoryId)

    return (
      <div>
        There are { products.length } products
        <hr/>
        {
          categories.map(cat=> <p key={ cat.id }>{ cat.name } has { cat.products.length } prodcuts.</p>)
        }
        { noCat.length ? <p>{ noCat.length } product(s) have no categories.</p> : null }
        <hr/>
        { products.length ? <p>The most expensive product is { mostExpensive.name } at { mostExpensive.price }</p> : null } 
      </div>
    )
  }
}

export default Summary
