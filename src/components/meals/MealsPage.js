import React from 'react';
//CSS
import styles from './MealsPage.module.css';
//CUSTOM COMPONENTS
import MealsList from './MealsList';

const MealsPage = () => (
  <>
    <section className={styles.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
    <MealsList/>
  </>
)

export default MealsPage;