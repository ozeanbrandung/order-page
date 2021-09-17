import React, {useContext, useEffect, useState, useMemo} from "react";
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
    //чтобы каждый раз как компонент перерисовывается но это не затрагивает items 
    //чтобы не перевыполнять всякие сортировки подсчеты лишний раз есть useMemo
    //в useMemo передается функиця и зависимости, функция должна вернуть значение 
    const totalAmount = useMemo(()=> {
        return items.reduce(
            //обрати внимание что currentAmount + item.amount именно возвращаются !
            //из функции
            (currentAmount, item) => (currentAmount + item.amount), 0)
    }, [items])
    //но надо следить чтобы dependencies тоже каждый раз не менялись 
    //та же проблема с разными объектами одинакового содержания в js
    
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

//для оптимизации - будет перезапущена функция не всегда когда app перезапушено 
//а тогда когда поменялись props для данного компонента
//не везде вешать этот метод а только на высших уровнях компонентов и где 
//это вообще необходимо - поскольку чтобы делть эту проверку тоже ресурсы расходуются
//и это только для больших приложений
//но это работает толко для примитивных знаений! т.е. если мы передаем объекты и функции 
//то они каждый раз будут восприняты по-новому и хоть содержимое их одинаково
//в js каждый объект и функция не расны друг другу: даже {} !== {} 
//чтобы функции с одинаковым содержимым каждый раз не пересоздавались 
//нужно использовать hook useCallback
export default React.memo(HeaderCartButton);