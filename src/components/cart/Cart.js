import React, {useContext, useState} from "react";
//STORE CONTEXT 
import CartContext from '../../store/cart-context';
//CUSTOM CSS
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
//CSS
import styles from './Cart.module.css';
import Checkout from "./Checkout";

const Cart = ({closeCart}) => {
    const [shownElemet, changeShownElemet] = useState('CART_ITEMS');
    const [submittingProcess, setSubmittingInProcess] = useState({
        loading: false, 
        success: false
    });
    const [submittingError, setSubmittingError] = useState(null);

    const cartCtx = useContext(CartContext);

    const totalPrice = cartCtx.totalPrice.toFixed(2);

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        //забайндить напрямую нельзя
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item => {
        //забайндить напрямую нельзя
        cartCtx.addItem(item)
    }

    const orderHandler = () => {
        changeShownElemet('ORDER_FORM')
    }

    const cancelHandler = () => {
        changeShownElemet('CART_ITEMS')
    }

    const submitOrderHandler = async userData => {
        setSubmittingInProcess({loading: true})
        try{
            const response = await fetch('https://order-page-39ce8-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
                method: 'POST', 
                body: JSON.stringify({
                    user: userData, 
                    orderedItems: cartCtx.items
                })
            });
            if (!response.ok) {
                throw new Error('Unsuccessful attempt to order')
            }
            cartCtx.clearCart();
            setSubmittingInProcess({loading: false, success: true})
        } catch (err) {
            console.log(err) 
            setSubmittingInProcess({loading: false, success: false})
            setSubmittingError(err)
        }
    }

    const cartItems = <ul className={styles['cart-items']}>{
        cartCtx.items.map(
        //bind позволит передать дальше item чтобы функция когда будет вызываться а вызывается она не здесь
        //получила этот item
        cartItem => <CartItem key={cartItem.id} {...cartItem} addItem={cartItemAddHandler.bind(null, {...cartItem, amount: 1})} removeItem={cartItemRemoveHandler.bind(null, cartItem.id)}/>)
                            }</ul>

  const cartPage = (
        <>
                {cartItems}
                <div className={styles.total}>
                    <span>Total Price</span>
                    <span>${totalPrice}</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles['button--alt']} onClick={closeCart}>Close</button>
                    {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
                </div>
        </>
  )

  const modalContent = (
      <>
      {shownElemet === 'CART_ITEMS' && cartPage}
      {shownElemet === 'ORDER_FORM' && <Checkout onCancel={cancelHandler} submitOrder={submitOrderHandler}/>}
      </>
  )
  
        return(
            <Modal closeCart={closeCart}>
                {submittingProcess.loading && <p>Making a new order...</p>}
                {submittingError && 
                    <>
                        <p>There was an error while making a new order, please try again!</p>
                        <div className={styles.actions}>
                            <button className={styles['button--alt']} onClick={closeCart}>OK</button>
                        </div>
                    </>
                }
                {submittingProcess.success && 
                    <>
                    <p>The order has been submitted for processing.</p>
                    <div className={styles.actions}>
                        <button className={styles['button--alt']} onClick={closeCart}>OK</button>
                    </div>
                    </>
                }
                {!submittingProcess.loading && !submittingProcess.success && !submittingError && modalContent}
            </Modal>
        )
   
}

export default Cart;