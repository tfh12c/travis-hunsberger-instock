import './DeleteInventoryModal.scss';
import close from '../../assets/icons/close.svg';

function DeleteInventoryModal({ closeDeleteModal, handleDelete, item }) {

    return (
        <div className='delete-inventory-modal'>
            <div className='delete-inventory-modal__modal-content'>
                <button className='delete-inventory-modal__close-button' onClick={() => closeDeleteModal()}>
                    <img className='delete-inventory-modal__close' src={close} alt='close icon'></img>
                </button>
                <div className='delete-inventory-modal__text-container'>     
                    <h1 className='delete-inventory-modal__header'>Delete {item.itemName} inventory item?</h1>
                    <p className='delete-inventory-modal__body'>Please confirm that you'd like to delete {item.itemName} from the inventory list. You won't be able to undo this action.</p>
                </div>
                <div className='delete-inventory-modal__button-container'>
                    <button onClick={() => closeDeleteModal()} className='delete-inventory-modal__cancel'>Cancel</button>
                    <button onClick={() => handleDelete(item.id)} className='delete-inventory-modal__delete'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteInventoryModal;