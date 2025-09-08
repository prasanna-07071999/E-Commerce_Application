import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {productData, onDelete} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  const onClickDelete = event => {
    event.preventDefault()
    onDelete(id)
  }

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </Link>
      <button type="button" onClick={onClickDelete} className="delete-button">
        Delete
      </button>
    </li>
  )
}
export default ProductCard
