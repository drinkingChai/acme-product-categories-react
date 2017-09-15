import React, { Component } from 'react'
import axios from 'axios'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      name: '',
      price: '',
      instock: false,
      category: 0
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSaveHandler = this.onSaveHandler.bind(this)
  }

  componentDidMount() {
    axios.get('/api/categories')
    .then(response=> response.data)
    .then(categories=> this.setState({ categories }))

    if (this.props.product) {
      const { name, price, instock, category } = this.props.product
      this.setState({ name, price, instock, category })
    }
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    switch (name) {
      case 'name':
        this.setState({ name: value })
        break;
      case 'price':
        this.setState({ price: value })
        break;
      case 'instock':
        this.setState({ instock: ev.target.checked })
        break;
      case 'category':

        break;
      default:

    }
  }

  onSaveHandler(ev) {
    // if this.props.product, update
    // else post
    ev.preventDefault()
    if (this.props.product) {
      console.log('updating!');
    } else {
      console.log('creating!');
    }
  }

  render() {
    const { categories, name, price, instock, category } = this.state
    const { onChangeHandler, onSaveHandler } = this
    const { onDeleteHandler } = this.props

    return (
      <form>
        <fieldset>
          <label htmlFor='name'>Name</label>
          <input name='name' value={ name } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='price'>Price</label>
          <input name='price' type='number' value={ price } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='instock'>Instock</label>
          <input name='instock' type='checkbox' checked={ instock ? true : false } onChange={ onChangeHandler }/>
        </fieldset>

        <fieldset>
          <label htmlFor='category'>Category</label>
          <select name='category' value={ category ? category.id : 0 } onChange={ onChangeHandler }>
            <option>-- none --</option>
          {
            categories.map(category=> (
              <option key={ category.id } value={ category.id }>{ category.name }</option>
            ))
          }
          </select>
        </fieldset>

        <fieldset>
          <button onClick={ onSaveHandler }>Save</button>
          { this.props.product ? <button onClick={ onDeleteHandler }>Delete</button> : null }
        </fieldset>
      </form>
    )
  }
}

export default ProductForm
