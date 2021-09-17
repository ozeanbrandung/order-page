import { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem';
//CSS
import styles from './MealsList.module.css';

const MealsList = () => {
  const [meals, setMeals] = useState([])
  const [loading, setLoadingProcessed] = useState(true)
  const [fetchingError, setFetchingError] = useState(null)

  const dataProcessing = useCallback(async (url) => {
    //обязательно .json! иначе вылезает ошибка CORS!
    const response = await fetch(url);
    if (response.ok) {
      const body = await response.json();
      //console.log(body)
      //обязательно [], иначе push не сработает на udentified
      let newArray = [];
      for (let key in body) {
        //console.log(newArray, key, body)
        newArray.push({id: key, ...body[key]})
      }
      //console.log(newArray)
    return newArray;
    } else {
      throw new Error('Fetching is failed!')
    }
  }, [])

  const fetchData = useCallback(async () => {
    try {
      const meals = await dataProcessing('https://order-page-39ce8-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
      setLoadingProcessed(false)
      setMeals(meals)
    } catch (err) {
      setLoadingProcessed(false)
      setFetchingError(err.message)
      //console.log('im here', fetchingError, loading)
    }
    //не забыть await потому что dataProcessing - асинхронная функция и возвращает не только что мы выкинули, но и промис
    
    //console.log(meals)
    
  }, [dataProcessing])

  useEffect(() => {
    //console.log("i'm running")
      fetchData()
  }, [fetchData])

    //console.log(meals)
    const mealsList = meals.map(
      ({id, name, description, price}) => <MealItem key={id} id={id} name={name} description={description} price={price} />
    )
  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {fetchingError && <p style={{textAlign: 'center'}}>Sorry, menu currently cannot be uploaded :( <br/> Error details: {fetchingError}</p>}
          {loading && <p>Menu is currently loading, wait a minute, please!</p>}
          {!loading && !fetchingError && mealsList}
        </ul>
      </Card>
    </section>
    )
}

export default MealsList;