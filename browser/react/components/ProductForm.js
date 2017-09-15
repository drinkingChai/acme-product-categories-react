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
        instock: false,
        category: 0
      }
    }
    this.onSave = this.onSave.bind(this)
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
      case 'instock':
        product.instock = value
        this.setState({ product })
        break
      case 'category':

      default:
    }
  }

  onSave(ev) {
    ev.preventDefault()
    const { onSaveHandler } = this.props
    onSaveHandler(this.state.product)
  }

  render() {
    // const { categories, name, price, instock, category } = this.state
    const { categories, product } = this.state
    const { onDeleteHandler, onSaveHandler } = this.props
    const { onChangeHandler, onSave } = this

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
          <label htmlFor='instock'>Instock</label>
          <input name='instock' type='checkbox' checked={ product.instock ? true : false } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='category'>Category</label>
          <select name='category' value={ product.category ? product.category.id : 0 } onChange={ onChangeHandler }>
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
          { this.props.product ? <button onClick={ onDeleteHandler }>Delete</button> : null }
        </fieldset>
      </form>
    )
  }
}

export default ProductForm
