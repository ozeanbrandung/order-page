import React from 'react';
//CSS
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const {id, name, price, amount, removeItem, addItem} = props;
  //const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${price.toFixed(2)}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => 
            //removeItem(id)
            //поскольку использовали bind выше - можно так
            removeItem()
            }>−</button>
        <button onClick={() => 
            //addItem({id, name, price, amount})
            //поскольку использовали bind выше - можно так
            addItem()
            }>+</button>
      </div>
    </li>
  );
};

export default CartItem;