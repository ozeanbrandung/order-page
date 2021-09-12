import React, {useContext} from 'react';
//CSS
import styles from './MealItem.module.css';
//CUSTOM COMPONENTS
import MealItemAddForm from './MealItemAddForm';
//STATE CONTEXT 
import CartContext from '../../store/cart-context';

const MealItem = props => {
    const {id, name, description, price} = props;

    const cartCtx = useContext(CartContext);

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id, 
            name, 
            //description, 
            price, 
            amount
        }) 
    }
    return (
        <li className={styles.meal}>
            <div>
                <h3>{name}</h3>
                <div className={styles.description}>{description}</div>
                {/* toFixed() - округление на 2 цифры после точки */}
                <div className={styles.price}>{`$${price.toFixed(2)}`}</div>
            </div>
            <div>
                <MealItemAddForm id={id} addToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem;