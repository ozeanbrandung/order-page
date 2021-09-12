import React, { useState } from 'react';
import './App.css';
//CUSTOM COMPONENTS
import Header from './components/layout/Header';
import Cart from './components/cart/Cart';
import MealsPage from './components/meals/MealsPage';
//STATE PROVIDER
import { CartContextProvider } from './store/cart-context';


function App() {
  const [cartIsVisible, setCartVisibility] = useState(false);

  const closeCart = () => {
    setCartVisibility(false)
  }

  const openCart = () => {
    setCartVisibility(true)
  }

  return (
    <CartContextProvider>
      <Header openCart={openCart}/>
      {cartIsVisible && <Cart closeCart={closeCart}/>}
      <main>
        <MealsPage/>
      </main>
    </CartContextProvider>
  );
}

export default App;
