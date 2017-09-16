import React, { Component } from 'react'
import Error from './Error'

class ProductForm extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      price: 0,
      inStock: false,
      categoryId: null
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(ev) {
    ev.preventDefault()
    console.log('changed!')
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    console.log('submitted!')
  }

  render() {
    const { name, price, inStock, categoryId } = this.state
    const { product, categories } = this.props
    const { onChangeHandler, onSubmitHandler } = this
    const inStockId = `inStock${ product ? product.id : 0 }`

    return (
      <form onSubmit={ onSubmitHandler }>
        <div>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ name } onChange={ onChangeHandler }/>
        </div>

        <div>
          <label htmlFor='price'>Price</label>
          <input name='price' value={ price } type='number' onChange={ onChangeHandler }/>
        </div>

        <div>
          <input name='inStock' id={ inStockId } value={ inStock } type='checkbox' onChange={ onChangeHandler }/>
          <label htmlFor={ inStockId }>In stock</label>
        </div>

        <select>
          <option value={ 0 }>-- none --</option>
        {
          categories.map(cat=> <option value={ cat.id } key={ cat.id }>{ cat.name }</option>)
        }
        </select>

        <button>Save</button>
        <button>Delete</button>
      </form>
    )
  }
}

export default ProductForm
