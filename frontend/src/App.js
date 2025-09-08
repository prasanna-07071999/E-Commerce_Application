import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import ProductForm from './components/ProductForm'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    const cartData = localStorage.getItem('cartData')
    if (cartData) {
      this.setState({cartList: JSON.parse(cartData)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartList !== this.state.cartList) {
      localStorage.setItem('cartData', JSON.stringify(this.state.cartList))
    }
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const productObject = cartList.find(
        eachCartItem => eachCartItem.id === product.id,
      )
      if (productObject) {
        return {
          cartList: cartList.map(eachCartItem => {
            if (eachCartItem.id === product.id) {
              return {
                ...eachCartItem,
                quantity: eachCartItem.quantity + product.quantity,
              }
            }
            return eachCartItem
          }),
        }
      }

      return {cartList: [...cartList, product]}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachCartItem => eachCartItem.id !== id,
      ),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []}, () => {
    localStorage.removeItem('cartData')
  })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + 1}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(eachCartItem => {
          if (eachCartItem.id === id) {
            return {...eachCartItem, quantity: eachCartItem.quantity - 1}
          }
          return eachCartItem
        })
        .filter(eachCartItem => eachCartItem.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/register" component={RegisterForm}/>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <Route path="/products/new" component={ProductForm} />
          <Route path="/products/edit/:id" component={ProductForm} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/register" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
