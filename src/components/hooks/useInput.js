import {useState} from 'react';

//ожидаем на вход функцию для валидации
const useInput = (validateValue) => {
    //использована {} а не [] юыла ошибка из-за этого! аккуратнее!
    const [enteredValue, setEnteredValue] = useState('');
    const [inputTouched, setInputTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const errorShown = inputTouched && !valueIsValid;

    const keystrokeHandler = event => {
        setEnteredValue(event.target.value)
    }

    const inputBlurHandler = () => {
        setInputTouched(true)
    }

    const reset = () => {
        setEnteredValue('')
        setInputTouched(false)
    }

 return(
    {
        value: enteredValue, 
        valueIsValid, 
        errorShown,
        keystrokeHandler, 
        inputBlurHandler,
        reset
    }
 )
}

export default useInput;