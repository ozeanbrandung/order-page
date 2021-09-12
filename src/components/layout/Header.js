import React from 'react';
//CSS
import styles from './Header.module.css';
//img (webpack)
import mealsImg from '../../assets/meals.jpg';
//CUSTOM COMPONENTS
import HeaderCartButton from './HeaderCartButton';

const Header = ({openCart}) => (
    <>
        <header className={styles.header}>
            <h1 className={styles.titel}>ReactMeals</h1>
            <HeaderCartButton openCart={openCart}/>
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImg} alt='Table full of delicious food!'/>
        </div>
    </>
)

export default Header;