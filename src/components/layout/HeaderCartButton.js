import React, {useContext, useEffect, useState} from "react";
//STATE CONTEXT 
import CartContext from '../../store/cart-context';
//CSS
import styles from './HeaderCartButton.module.css';
//CUSTOM COMPONENTS
import CartIcon from '../cart/CartIcon';

const HeaderCartButton = ({ openCart }) => {
    //вместо <CartContext.Consumer> (cartCtx) => {JSX} </CartContext.Consumer>
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const totalAmount = items.reduce(
        //обрати внимание что currentAmount + item.amount именно возвращаются !
        //из функции
        (currentAmount, item) => (currentAmount + item.amount), 0)

        const [btnAnimation, setBtnAnimation] = useState(false);
        
        useEffect(()=> {
            if(items.length === 0){
                return
            }
            setBtnAnimation(true);
            const timer = setTimeout(()=> {
                //это все нужно чтобы убрать класс анимации 
                //и снова поставить его когда в items будут изменения
                setBtnAnimation(false)
            }, 300)

            return ()=> {clearTimeout(timer)}

        }, [items])
        
        const btnClasses = `${styles.button} ${btnAnimation ? styles.bump : ''}`
    return (
        <button className={btnClasses} onClick={openCart}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span className={styles.titel}>Your Cart</span>
            <span className={styles.badge}>{totalAmount}</span>
        </button>
    )
}

export default HeaderCartButton;