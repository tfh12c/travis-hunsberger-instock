import './DeleteWarehouseModal.scss'

function DeleteWarehouseModal({ handleModal, handleDelete, warehouse }) {

    return (
        <div className='delete-warehouse-modal'>
            <div className='delete-warehouse-modal__modal-content'>
                <div className='delete-warehouse-modal__text-container'>     
                    <h1 className='delete-warehouse-modal__header'>Delete {warehouse.name} warehouse?</h1>
                    <p className='delete-warehouse-modal__body'>Please confirm that you'd like to delete {warehouse.name} from the list of warehouses. You won't be able to undo this action.</p>
                </div>
                <div className='delete-warehouse-modal__button-container'>
                    <button className='delete-warehouse-modal__cancel'>Cancel</button>
                    <button className='delete-warehouse-modal__delete'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarehouseModal;