import React, { useState, useCallback } from 'react';
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

  //useCallback - для сохранения функции в памяти и послед. оптимизации 
  //приложения с пом. memo() - см компонент, куда передается эта функция
  const openCart = useCallback(() => {
    setCartVisibility(true)
    //передаем зависимости
    //функицю из useState можно не передавать, React и так гарантирует, что 
    //она одна и та же 
  }, [])
  //если мы используем какие-то другие переменные или констаныт внутри сохраненной 
  //функции то их надо добавить в массив записимостей, а то они сохранятся навсегда
  //какие есть, потому что функции в js - closures 
  //% if (valid) {setCartVisibility(true)} - valid в зависимотси потому что 
  //это переменная из другого state и нам нужно чтобы она меняласьб

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
