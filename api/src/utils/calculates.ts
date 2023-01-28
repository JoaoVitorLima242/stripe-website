import { cartItem } from '../@types/cartItem'

export const calculateOrderAmount = (cartItems: cartItem[]) => {
  return (
    cartItems.reduce((total, product) => {
      const quantity = product.quantity || 1

      return total + product.price * quantity
    }, 0) * 100
  )
}
