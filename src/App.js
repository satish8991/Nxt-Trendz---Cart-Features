import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    totalPrice: 0,
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const result = cartList.find(eachItem => eachItem.id === product.id)
    this.setState(prevState => ({
      totalPrice: prevState.totalPrice + product.price * product.quantity,
    }))
    if (result === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    } else {
      const newCartList = cartList.slice()
      const newItem = {...result, quantity: result.quantity + 1}
      const index = newCartList.findIndex(
        eachItem => eachItem.id === product.id,
      )
      newCartList.splice(index, 1, newItem)
      this.setState({cartList: newCartList})
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartList = cartList.slice()
    const index = newCartList.findIndex(each => each.id === id)
    newCartList.splice(index, 1)
    this.setState({cartList: newCartList})
    this.setState(prevState => ({
      totalPrice:
        prevState.totalPrice - cartList[index].price * cartList[index].quantity,
    }))
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const result = cartList.find(eachItem => eachItem.id === id)
    const newCartList = cartList.slice()
    const newItem = {...result, quantity: result.quantity + 1}
    const index = newCartList.findIndex(eachItem => eachItem.id === id)
    newCartList.splice(index, 1, newItem)
    this.setState({cartList: newCartList})
    this.setState(prevState => ({
      totalPrice: prevState.totalPrice + result.price,
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newCartList = cartList.slice()
    const index = newCartList.findIndex(each => each.id === id)
    const result = newCartList.find(each => each.id === id)
    if (result.quantity === 1) {
      newCartList.splice(index, 1)
    } else {
      const newItem = {...result, quantity: result.quantity - 1}
      newCartList.splice(index, 1, newItem)
    }
    this.setState({cartList: newCartList})
    this.setState(prevState => ({
      totalPrice: prevState.totalPrice - result.price,
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: [], totalPrice: 0})
  }

  render() {
    const {cartList, totalPrice} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          totalPrice,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
