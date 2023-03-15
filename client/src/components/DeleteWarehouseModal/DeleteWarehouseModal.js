import './DeleteWarehouseModal.scss'
import close from '../../assets/icons/close.svg'

function DeleteWarehouseModal({ closeDeleteModal, handleDelete, warehouse }) {

    return (
        <div className='delete-warehouse-modal'>
            <div className='delete-warehouse-modal__modal-content'>
                <button className='delete-warehouse-modal__close-button' onClick={() => closeDeleteModal()}>
                    <img className='delete-warehouse-modal__close' src={close} alt='close icon'></img>
                </button>
                <div className='delete-warehouse-modal__text-container'>     
                    <h1 className='delete-warehouse-modal__header'>Delete {warehouse.name} warehouse?</h1>
                    <p className='delete-warehouse-modal__body'>Please confirm that you'd like to delete {warehouse.name} from the list of warehouses. You won't be able to undo this action.</p>
                </div>
                <div className='delete-warehouse-modal__button-container'>
                    <button onClick={() => closeDeleteModal()} className='delete-warehouse-modal__cancel'>Cancel</button>
                    <button onClick={() => handleDelete(warehouse.id)} className='delete-warehouse-modal__delete'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarehouseModal;