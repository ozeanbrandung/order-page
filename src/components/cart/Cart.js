import React, {useContext} from "react";
//STORE CONTEXT 
import CartContext from '../../store/cart-context';
//CUSTOM CSS
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
//CSS
import styles from './Cart.module.css';


const Cart = ({closeCart}) => {
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

    const cartItems = <ul className={styles['cart-items']}>{
        cartCtx.items.map(
        //bind позволит передать дальше item чтобы функция когда будет вызываться а вызывается она не здесь
        //получила этот item
        cartItem => <CartItem key={cartItem.id} {...cartItem} addItem={cartItemAddHandler.bind(null, {...cartItem, amount: 1})} removeItem={cartItemRemoveHandler.bind(null, cartItem.id)}/>)
                            }</ul>

    return(
        <Modal closeCart={closeCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Price</span>
                <span>${totalPrice}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={closeCart}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;