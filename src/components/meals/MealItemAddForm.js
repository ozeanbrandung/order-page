import React, {useRef, useState} from 'react';
//CSS
import styles from './MealItemAddForm.module.css';
//CUSTOM COMPONENTS
import Input from '../UI/Input';

const MealItemAddForm = props => {
    const [valid, setValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();

        //amountInputRef.current - указывает на физический импут в dom дереве
        //затем с ним что-то можно делать, например, прочитать prop value
        const enteredAmount = amountInputRef.current.value;
        //значение value у input всегда строка, так что преобразуем 
        const convertedAmount = +enteredAmount;

        if (enteredAmount.trim().length === 0 || convertedAmount <1 || convertedAmount > 5) {
            setValid(false)
            return;
        }

        //через пропсы а не через контекст - потому что в этом компоненте у нас нет 
        //полного item-а который нужен функции addToCart
        props.addToCart(convertedAmount);
    }
    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <Input label="Amount" 
                ref={amountInputRef}
                input={
                    {
                        //чтобы не были одинаковыми потому что MealItem у нас 
                        //вообще в результате map-инга создается
                        id: 'amount_' + props.id,
                        type: 'number',
                        min: '1', 
                        max: '5',
                        step: '1', 
                        defaultValue: '1'
                    }
                }
            />
            <button type='submit'>+ Add</button>
            {!valid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    )
}

export default MealItemAddForm;