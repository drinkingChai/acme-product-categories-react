import React, { Component } from 'react'
import axios from 'axios'
import Error from './Error'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      product: {
        name: '',
        price: 0,
        inStock: false,
        categoryId: 0
      },
      error: ''
    }
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentDidMount() {
    axios.get('/api/categories')
    .then(response=> response.data)
    .then(categories=> this.setState({ categories }))

    if (this.props.product) this.setState({ product: this.props.product })
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    const { product } = this.state

    switch (name) {
      case 'name':
        product.name = value
        this.setState({ product })
        break
      case 'price':
        product.price = value*1
        this.setState({ product })
        break
      case 'inStock':
        product.inStock = !product.inStock
        this.setState({ product })
        break
      case 'category':
        product.categoryId = value
        this.setState({ product })
        break;
      default:
    }
  }

  onSave(ev) {
    ev.preventDefault()
    const { onSaveHandler } = this.props
    onSaveHandler(this.state.product)
    .then(()=> {
      const product = {
        name: '',
        price: 0,
        inStock: false,
        categoryId: 0
      }
      if (!this.props.product) this.setState({ product })
    })
    .catch(err=> {
      const { error } = this.state
      this.setState({ error: err.response.data.errors[0].message })
    })
  }

  onDelete(ev) {
    ev.preventDefault()
    const { onDeleteHandler } = this.props
    onDeleteHandler(this.state.product)
  }

  render() {
    // const { categories, name, price, inStock, category } = this.state
    const { categories, product, error } = this.state
    const { onDeleteHandler, onSaveHandler } = this.props
    const { onChangeHandler, onSave, onDelete } = this

    return (
      <form>
        { error.length ? <Error message={ error }/> : null }
        <fieldset>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ product.name } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='price'>Price</label>
          <input name='price' type='number' value={ product.price } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset className='input-group'>
          <input name='inStock' id={ `inStock${product.id || 0}` }
            type='checkbox'
            checked={ product.inStock ? true : false }
            onChange={ onChangeHandler }/>
          <label htmlFor={ `inStock${product.id || 0}` }>Instock</label>
        </fieldset>

        <fieldset>
          <label htmlFor='category'>Category</label>
          <select name='category' value={ product.categoryId || 0 } onChange={ onChangeHandler }>
            <option value={ 0 }>-- none --</option>
          {
            categories.map(category=> (
              <option key={ category.id } value={ category.id }>{ category.name }</option>
            ))
          }
          </select>
        </fieldset>

        <fieldset>
          <button onClick={ onSave } className='btn btn-blue-filled' disabled={ product.name.length ? false : true }>Save</button>
          { product.id ? <button onClick={ onDelete } className='btn btn-red-filled'>Delete</button> : null }
        </fieldset>
      </form>
    )
  }
}

export default ProductForm
