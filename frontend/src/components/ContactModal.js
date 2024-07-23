
import ReactDOM from 'react-dom';
import styles from './ContactModal.module.css';

export default function ContactModal({ onClose }) {

    const handleOkayClick = () => {
        onClose(); 
    };

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.heading}>sent successfully</div>
                <button onClick={handleOkayClick} className={styles.button}>Okay</button>
            </div>
        </div>,
        document.getElementById('success')
    );
}
