import './WarehouseInventoryCard.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import trashcan from '../../assets/icons/delete_outline.svg';
import edit from '../../assets/icons/edit.svg';
import chevron from '../../assets/icons/chevron_right.svg';
import DeleteWarehouseInventoryModal from '../DeleteWarehouseInventoryModal/DeleteWarehouseInventoryModal';

function WarehouseInventoryCard({ inventoryData, getInventoryOfWarehouse, warehouseId }) { 
    const [item, setItem] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleDelete = async (id) => {
      try {
          await axios.delete(`http://localhost:4000/inventory/delete/${id}`);
          setDeleteModal(false);
          getInventoryOfWarehouse(warehouseId)
      } catch (error) {
          console.log(error);
      }
  }

  const openDeleteModal = (item) => {
      setItem(item);
      setDeleteModal(true);
  }

  const closeDeleteModal = () => {
      setDeleteModal(false);
  }

  //When deleteModal is opened, .body overflow will be hidden to prevent background scrolling
  useEffect(() => {
      document.body.style.overflow = deleteModal ? "hidden" : "unset"
  }, [deleteModal])

    return (
        <section>
           {inventoryData.map((inventory) => (
            <article key={inventory.id} className='warehouse-inventory-card'>
                <div className='warehouse-inventory-card__details-container'>  
                    <div className='warehouse-inventory-card__item-details'>
                        <h4 className='warehouse-inventory-card__inventory-header'>INVENTORY ITEM</h4>
                            <Link to={`/inventory/${inventory.id}`}>  
                                <button className='warehouse-inventory-card__name-icon-button'>   
                                    <h3 className='warehouse-inventory-card__inventory-name'>{inventory.itemName}</h3>
                                    <img className='warehouse-inventory-card__inventory-name-chevron' src={chevron} alt='chevron icon'/>
                                </button>
                            </Link>
                        <h4 className='warehouse-inventory-card__category-header'>CATEGORY</h4>
                        <p className='warehouse-inventory-card__category'>{inventory.category}</p>
                        {/* <button onClick={() => openDeleteModal(inventory)} className='warehouse-inventory-card__trashcan-button'>  
                            <img className='warehouse-inventory-card__trashcan' src={trashcan} alt='trashcan icon'/>
                        </button> */}
                    </div>
                    <div className='warehouse-inventory-card__status-details'>
                        <h4 className='warehouse-inventory-card__status-header'>STATUS</h4>
                        <p className='warehouse-inventory-card__status'>
                            <span className={inventory.quantity ? 'warehouse-inventory-card__status-tag--instock' : 'warehouse-inventory-card__status-tag--outofstock'}>{inventory.status}</span>
                        </p>
                        <h4 className='warehouse-inventory-card__quantity-header'>QTY</h4>
                        <p className='warehouse-inventory-card__quantity'>{inventory.quantity}</p>
                        {/* <Link to={`/inventory/edit/${inventory.id}`}>     
                            <button className='warehouse-inventory-card__edit-button'>  
                                <img className='warehouse-inventory-card__edit' src={edit} alt='edit icon'/>
                            </button>
                        </Link> */}
                    </div>
                </div>
                <div className='warehouse-inventory-card__delete-edit-container'>
                    <div className='warehouse-inventory-card__trashcan-container'>
                        <button onClick={() => openDeleteModal(inventory)} className='warehouse-inventory-card__trashcan-button'>  
                            <img className='warehouse-inventory-card__trashcan' src={trashcan} alt='trashcan icon'/>
                        </button>
                    </div>
                    <div className='warehouse-inventory-card__edit-container'>
                        <Link to={`/inventory/edit/${inventory.id}`}>     
                            <button className='warehouse-inventory-card__edit-button'>  
                                <img className='warehouse-inventory-card__edit' src={edit} alt='edit icon'/>
                            </button>
                        </Link>
                    </div>
                </div>
            </article>
           ))} 
            {deleteModal && <DeleteWarehouseInventoryModal closeDeleteModal={closeDeleteModal} handleDelete={handleDelete} item={item} />} 
        </section>
    )
}

export default WarehouseInventoryCard;