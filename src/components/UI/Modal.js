import React from 'react';
import ReactDOM from 'react-dom';
//CSS
import styles from './Modal.module.css';

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.closeCart}></div>
}

const ModalOverlay = props => {
    return(
            <div className={styles.modal}>
                <div className={styles.content}>{props.children}</div>
            </div>
    )
}

//прежде чем что-то делать с модулем в index.html надо добавить div с id
//куда потом этот модуль воткнем
//в нашем случае id='overlays'
const Modal = props => {
    const portalElemet = document.getElementById('overlays')
    return(
        <>
            {ReactDOM.createPortal(<Backdrop closeCart={props.closeCart}/>, portalElemet)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElemet )}
        </>
    )
}

export default Modal;