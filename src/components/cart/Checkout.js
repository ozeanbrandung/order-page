import styles from './Checkout.module.css';
import useInput from '../hooks/useInput';

const Checkout = props => {

    const { value: enteredName,
            valueIsValid: nameIsValid,
            errorShown: invalidNameInput,
            keystrokeHandler: nameChangedHandler,
            inputBlurHandler: nameBluredHandler,
            reset: resetNameInput } = useInput(value => value.trim() !== '')

    const {
            value: enteredCity,
            valueIsValid: cityIsValid,
            errorShown: invalidCityInput,
            keystrokeHandler: cityChangedHandler,
            inputBlurHandler: cityBluredHandler,
            reset: resetCityInput
    } = useInput(value => value.trim() !== '')

    const {
            value: enteredStreet,
            valueIsValid: streetIsValid,
            errorShown: invalidStreetInput,
            keystrokeHandler: streetChangedHandler,
            inputBlurHandler: streetBluredHandler,
            reset: resetStreetInput
        } = useInput(value => value.trim() !== '')

    const {
            value: enteredHouse,
            valueIsValid: houseIsValid,
            errorShown: invalidHouseInput,
            keystrokeHandler: houseChangedHandler,
            inputBlurHandler: houseBluredHandler,
            reset: resetHouseInput
        } = useInput(value => value > 0 && value <=1000)

    const {
            value: enteredFlat,
            valueIsValid: flatIsValid,
            errorShown: invalidFlatInput,
            keystrokeHandler: flatChangedHandler,
            inputBlurHandler: flatBluredHandler,
            reset: resetFlatInput
        } = useInput(value => value > 0 && value <=1000)

    //OVERALL FORM VALIDATION
    const formIsValid = nameIsValid && cityIsValid && streetIsValid && houseIsValid && flatIsValid;

    const submitHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            return
        }

        props.submitOrder({enteredName, enteredCity, enteredStreet, enteredHouse, enteredFlat})

        resetNameInput()
        resetCityInput()
        resetStreetInput()
        resetHouseInput()
        resetFlatInput()
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>

            <div className={`${styles.control} ${invalidNameInput && styles.invalid}`}>
                {/* htmlFor и id у input должы совпадать! */}
                <label htmlFor='name'>Your Name:</label>
                <input type='text'
                    id='name'
                    value={enteredName}
                    onChange={nameChangedHandler}
                    onBlur={nameBluredHandler}
                    className={`${styles.input} ${invalidNameInput && styles.invalid}`} />
                {invalidNameInput && <p className={styles['error-message']} >Name should not be empty!</p>}
            </div>

            <div className={`${styles.control} ${invalidCityInput && styles.invalid}`}>
                {/* htmlFor и id у input должы совпадать! */}
                <label htmlFor='city'>City:</label>
                <input type='text'
                    id='city'
                    value={enteredCity}
                    onChange={cityChangedHandler}
                    onBlur={cityBluredHandler}
                    className={`${styles.input} ${invalidCityInput && styles.invalid}`} />
                {invalidCityInput && <p className={styles['error-message']}>City should not be empty!</p>}
            </div>

            <div className={`${styles.control} ${invalidStreetInput && styles.invalid}`}>
                {/* htmlFor и id у input должы совпадать! */}
                <label htmlFor='street'>Street:</label>
                <input type='text'
                    id='street'
                    value={enteredStreet}
                    onChange={streetChangedHandler}
                    onBlur={streetBluredHandler}
                    className={`${styles.input} ${invalidStreetInput && styles.invalid}`} />
                {invalidStreetInput && <p className={styles['error-message']}>Street should not be empty!</p>}
            </div>

            <div className={`${styles.control} ${invalidHouseInput && styles.invalid}`}>
                {/* htmlFor и id у input должы совпадать! */}
                <label htmlFor='house'>House number:</label>
                <input  type='number' 
                        id='house' 
                        value={enteredHouse}
                        onChange={houseChangedHandler}
                        onBlur={houseBluredHandler}
                        className={styles.input} />
                        {invalidHouseInput && <p className={styles['error-message']}>Please enter valid house number from 0 to 1000!</p>}
                </div>

            <div className={`${styles.control} ${invalidFlatInput && styles.invalid}`}>
                {/* htmlFor и id у input должы совпадать! */}
                <label htmlFor='flat'>Flat number:</label>
                <input  type='text' 
                        id='flat' 
                        value={enteredFlat}
                        onChange={flatChangedHandler}
                        onBlur={flatBluredHandler}
                        className={`${styles.input} ${invalidFlatInput && styles.invalid}`} />
                        {invalidFlatInput && <p className={styles['error-message']}>Please enter valid flat number from 0 to 1000!</p>}
                </div>

            <div className={styles.actions}>
                <button type='button' className={styles.button} onClick={props.onCancel}>Cancel</button>
                <button type='submit' className={styles.button} disabled={!formIsValid}>Confirm</button>
            </div>
            
        </form>
    )
}

export default Checkout;