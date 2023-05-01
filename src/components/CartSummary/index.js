import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, totalPrice} = value
      return (
        <div className="cart-summary-container">
          <div className="amount-container">
            <h1 className="amount-sub-heading">Order Total:</h1>
            <h1 className="amount-heading"> {totalPrice}/-</h1>
          </div>
          <p className="cart-items">{cartList.length} Items in cart</p>
          <button className="button add-to-cart-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
