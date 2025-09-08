import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

import AllProductsSection from '../AllProductsSection'
import ProductCard from '../ProductCard'
import './index.css'

class Products extends Component {
  state = {
    productsList: [],
    loading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    try {
      const response = await fetch('https://e-commerce-application-backend-hbpu.onrender.com/products', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        this.setState({ productsList: data.products, loading: false })
      } else {
        this.setState({ error: 'Failed to fetch products', loading: false })
      }
    } catch {
      this.setState({ error: 'Network error', loading: false })
    }
  }

  deleteProduct = async id => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return

    const jwtToken = Cookies.get('jwt_token')
    try {
      const response = await fetch(`https://e-commerce-application-backend-hbpu.onrender.com/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      if (response.ok) {
        this.setState(prevState => ({
          productsList: prevState.productsList.filter(product => product.id !== id),
        }))
      } else {
        alert('Failed to delete product')
      }
    } catch {
      alert('Network error')
    }
  }

  render() {
    const { productsList, loading, error } = this.state
    return (
      <>
        <Header />
        <div className="product-sections">
          <AllProductsSection>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard
                  key={product.id}
                  productData={product}
                  onDelete={this.deleteProduct}
                />
              ))}
            </ul>
          </AllProductsSection>
        </div>
      </>
    )
  }
}

export default Products

