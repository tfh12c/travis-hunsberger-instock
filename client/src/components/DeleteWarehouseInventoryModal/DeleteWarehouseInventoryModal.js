import './DeleteWarehouseInventoryModal.scss';
import close from '../../assets/icons/close.svg';

function DeleteWarehouseInventoryModal({ closeDeleteModal, handleDelete, item }) {

    return (
        <div className='delete-warehouse-inventory-modal'>
            <div className='delete-warehouse-inventory-modal__modal-content'>
                <button className='delete-warehouse-modal__close-button' onClick={() => closeDeleteModal()}>
                    <img className='delete-warehouse-modal__close' src={close} alt='close icon'></img>
                </button>
                <div className='delete-warehouse-inventory-modal__text-container'>     
                    <h1 className='delete-warehouse-inventory-modal__header'>Delete {item.itemName} inventory item?</h1>
                    <p className='delete-warehouse-inventory-modal__body'>Please confirm that you'd like to delete {item.itemName} from the inventory list. You won't be able to undo this action.</p>
                </div>
                <div className='delete-warehouse-inventory-modal__button-container'>
                    <button onClick={() => closeDeleteModal()} className='delete-warehouse-inventory-modal__cancel'>Cancel</button>
                    <button onClick={() => handleDelete(item.id)} className='delete-warehouse-inventory-modal__delete'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarehouseInventoryModal;