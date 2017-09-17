import React, { Component } from 'react'
import Error from './Error'

class ProductForm extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      price: 0,
      inStock: false,
      categoryId: null,
      id: 0
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  }

  componentDidMount() {
    if (this.props.product) {
      const { name, price, inStock, categoryId, id } = this.props.product
      this.setState({ name, price, inStock, categoryId, id })
    }
  }

  onChangeHandler(ev) {
    console.log('changed!')

    const { name, value } = ev.target
    switch(name) {
      case 'name':
        this.setState({ name: value })
        break
      case 'price':
        this.setState({ price: value * 1 })
        break
      case 'inStock':
        this.setState({ inStock: !this.state.inStock })
        break
      case 'categoryId':
        this.setState({ categoryId: value })
        break
      default:
    }
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    console.log('submitted!')

    const { updateHandler, createHandler  } = this.props
    updateHandler ? updateHandler(this.state) : createHandler(this.state) 
  }

  onDeleteHandler(ev) {
    ev.preventDefault()
    
    this.props.deleteHandler(this.state)
  }

  render() {
    const { categories } = this.props
    const { name, price, inStock, categoryId, id } = this.state
    const { onChangeHandler, onSubmitHandler, onDeleteHandler } = this
    const inStockId = `inStock${ id ? id : 0 }`

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

        <div className='input-group'>
          <input name='inStock' id={ inStockId } checked={ inStock } type='checkbox' onChange={ onChangeHandler }/>
          <label htmlFor={ inStockId }>In stock</label>
        </div>

        <select name='categoryId' value={ categoryId || 0 } onChange={ onChangeHandler }>
          <option value={ 0 }>-- none --</option>
          {
            categories.map(cat=> <option value={ cat.id } key={ cat.id }>{ cat.name }</option>)
          }
        </select>

        <button className='btn-blue-filled'>Save</button>
        { id ? <button className='btn-red-filled' onClick={ onDeleteHandler }>Delete</button> : null }
      </form>
    )
  }
}

export default ProductForm
