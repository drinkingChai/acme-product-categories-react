import React, { Component } from 'react'
import axios from 'axios'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      product: {
        name: '',
        price: '',
        inStock: false,
        categoryId: 0
      }
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
        product.price = value
        this.setState({ product })
        break
      case 'inStock':
        product.inStock = value
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
    const product = {
      name: '',
      price: '',
      inStock: false,
      categoryId: 0
    }
    if (!this.props.product) this.setState({ product })
  }

  onDelete(ev) {
    ev.preventDefault()
    const { onDeleteHandler } = this.props
    onDeleteHandler(this.state.product)
  }

  render() {
    // const { categories, name, price, inStock, category } = this.state
    const { categories, product } = this.state
    const { onDeleteHandler, onSaveHandler } = this.props
    const { onChangeHandler, onSave, onDelete } = this

    return (
      <form>
        <fieldset>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ product.name } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='price'>Price</label>
          <input name='price' type='number' value={ product.price } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='inStock'>Instock</label>
          <input name='inStock' type='checkbox' checked={ product.inStock ? true : false } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='category'>Category</label>
          <select name='category' value={ product.categoryId } onChange={ onChangeHandler }>
            <option>-- none --</option>
          {
            categories.map(category=> (
              <option key={ category.id } value={ category.id }>{ category.name }</option>
            ))
          }
          </select>
        </fieldset>

        <fieldset>
          <button onClick={ onSave }>Save</button>
          { product.id ? <button onClick={ onDelete }>Delete</button> : null }
        </fieldset>
      </form>
    )
  }
}

export default ProductForm
