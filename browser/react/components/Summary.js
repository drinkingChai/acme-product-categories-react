import React, { Component } from 'react'

const Summary = (props)=> {
  const { products, categories } = props
  const mostExpensive = products.map(p=> p).sort((a, b)=> a.price < b.price)[0]
  const noCat = products.filter(p=> !(p.categoryId * 1)) // wont need *1 after axios
  const notInStock = products.filter(p=> !(p.inStock * 1))

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
      { notInStock.length ? <p>Products not in stock are { notInStock.map(p=> p.name).join(' ') }</p> : null }
    </div>
  )
}

export default Summary
