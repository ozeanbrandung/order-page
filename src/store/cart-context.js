import React from 'react';
import { useReducer } from 'react';

//initial значение задаем только затем чтоб была autocomplete
const CartContext = React.createContext({
    items: [], 
    totalPrice: 0, 
    addItem: (item) => {}, 
    removeItem: (id) => {}, 
    clearCart: () => {}
})

export default CartContext;

//REDUCER//
const defaultCartState = {
    items: [], 
    totalPrice: 0
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ITEM': {
            return addItem(state, action.payload)
        }
        case 'REMOVE_ITEM': {
            return removeItem(state, action.payload)
        }
        case 'CLEAR_CART': {
            return defaultCartState
        }
        default: 
            return state;
    }
}

//REDUCER'S HELPER FUNCTIONS 
const addItem = (state, itemToAdd) => {
    const {items, totalPrice} = state;
    const existingCartItemIndex = items.findIndex(arrItem => arrItem.id === itemToAdd.id);
    const existingCartItem = items[existingCartItemIndex];
    let updetedItems;
    if (existingCartItem) {
        const updetedItem = {
            ...existingCartItem, 
            amount: existingCartItem.amount + itemToAdd.amount
        }
        updetedItems = [...items];
        updetedItems[existingCartItemIndex] = updetedItem;
    } else {
        //concat(), в отличие от push(), возвращает новый массив, 
        //состоящий из массива, на котором он был вызван, 
        //соединённого с другими массивами и/или значениями, 
        //переданными в качестве аргументов
        updetedItems = items.concat(itemToAdd)
    }

    const updatedTotalPrice = totalPrice + itemToAdd.price * itemToAdd.amount;
    return({
        items: updetedItems, 
        totalPrice: updatedTotalPrice
    })
}

const removeItem = (state, itemIdToRemove) => {
    const {items, totalPrice} = state;
    //const cartItemToRemove = items[itemIdToRemove];
    const cartItemToRemove = items.find(item => item.id === itemIdToRemove);
    const cartItemToRemoveIndex = items.findIndex(item => item.id === cartItemToRemove.id);
    let updatedItems; 
    if (cartItemToRemove.amount === 1) {
        updatedItems = items.filter(item => item.id !== itemIdToRemove)
    } else {
        const updatedItem = {...cartItemToRemove, amount: cartItemToRemove.amount - 1}
        updatedItems = [...items]; 
        updatedItems[cartItemToRemoveIndex] = updatedItem
    }

    const updatedTotalPrice = totalPrice - cartItemToRemove.price;
    return {
        items: updatedItems, 
        totalPrice: updatedTotalPrice
    }
}

//PROVIDER//
export const CartContextProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD_ITEM', payload: item})
    } 

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE_ITEM', payload: id})
    }

    const clearCart = () => {
        dispatchCartAction({type: 'CLEAR_CART'})
    }

    const cartContext = {
        items: cartState.items, 
        totalPrice: cartState.totalPrice, 
        addItem: addItemToCartHandler, 
        removeItem: removeItemFromCartHandler, 
        clearCart
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}