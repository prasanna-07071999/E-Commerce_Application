import React, { Component } from 'react'
import Cookies from 'js-cookie'

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      brand: '',
      price: '',
      imageUrl: '',
      categoryId: '',
      rating: '',
      isEdit: false,
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    const { match } = this.props
    const isEdit = match.path.includes('edit')
    if (isEdit) {
      this.setState({ isEdit, loading: true })
      const productId = match.params.id
      this.fetchProductDetails(productId)
    }
  }

  fetchProductDetails = async productId => {
    const jwtToken = Cookies.get('jwt_token')
    try {
      const response = await fetch(`https://apis.ccbp.in/products/${productId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      if (response.ok) {
        const data = await response.json()
        this.setState({
          id: data.id,
          title: data.title,
          brand: data.brand,
          price: data.price,
          imageUrl: data.image_url,
          categoryId: data.category_id,
          rating: data.rating,
          loading: false,
        })
      } else {
        this.setState({ error: 'Failed to fetch product', loading: false })
      }
    } catch {
      this.setState({ error: 'Network error', loading: false })
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { id, title, brand, price, imageUrl, categoryId, rating, isEdit } = this.state
    const payload = {
      id,
      title,
      brand,
      price: parseFloat(price),
      image_url: imageUrl,
      category_id: parseInt(categoryId),
      rating: parseFloat(rating),
    }
    const jwtToken = Cookies.get('jwt_token')
    const url = isEdit
      ? `http://localhost:5000/products/${id}`
      : 'http://localhost:5000/products'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        this.props.history.push('/products')
      } else {
        alert('Failed to submit product')
      }
    } catch {
      alert('Network error')
    }
  }

  render() {
    const { title, brand, price, imageUrl, categoryId, rating, loading, error, isEdit } = this.state

    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>{error}</p>
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input name="title" value={title} onChange={this.handleChange} placeholder="Title" required />
        <input name="brand" value={brand} onChange={this.handleChange} placeholder="Brand" required />
        <input name="price" value={price} onChange={this.handleChange} placeholder="Price" type="number" required />
        <input name="imageUrl" value={imageUrl} onChange={this.handleChange} placeholder="Image URL" required />
        <input name="categoryId" value={categoryId} onChange={this.handleChange} placeholder="Category ID" type="number" required />
        <input name="rating" value={rating} onChange={this.handleChange} placeholder="Rating" type="number" required />
        <button type="submit">{isEdit ? 'Update' : 'Add'} Product</button>
      </form>
    )
  }
}

export default ProductForm
