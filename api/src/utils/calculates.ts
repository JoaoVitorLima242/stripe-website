import { cartItem } from '../@types/cartItem'

export const calculateOrderAmount = (cartItems: cartItem[]) => {
  return cartItems.reduce((total, product) => {
    return total + product.price
  }, 0 * 100)
}
