import './MobileInventoryCard.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import trashcan from '../../assets/icons/delete_outline.svg';
import edit from '../../assets/icons/edit.svg';
import chevron from '../../assets/icons/chevron_right.svg';
import DeleteInventoryModal from '../DeleteInventoryModal/DeleteInventoryModal';

function MobileInventoryCard({ inventory, getInventory, search }) {
    const [item, setItem] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [filteredInventory, setFilteredInventory] = useState(inventory);

      const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/inventory/delete/${id}`);
            setDeleteModal(false);
            getInventory();
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

    useEffect(() => {
        const filteredData = search ? inventory.filter(item => item.itemName.toLowerCase().includes(search)) : inventory;
        setFilteredInventory(filteredData);
    }, [search, inventory])

    return (
        <>
           {filteredInventory.map((item) => (
            <article key={item.id} className='mobile-inventory-card'>
                <div className='mobile-inventory-card__details-container'>  
                        <div className='mobile-inventory-card__item-details'>
                            <h4 className='mobile-inventory-card__inventory-header'>INVENTORY ITEM</h4>
                            <Link to={`/inventory/${item.id}`}> 
                                <button className='mobile-inventory-card__name-icon-button'>   
                                    <p className='mobile-inventory-card__inventory-name'>{item.itemName}</p>
                                    <img className='mobile-inventory-card__inventory-name-chevron' src={chevron} alt='chevron icon'/>
                                </button>
                            </Link>
                            <h4 className='mobile-inventory-card__category-header'>CATEGORY</h4>
                            <p className='mobile-inventory-card__category'>{item.category}</p>
                            {/* <button onClick={() => openDeleteModal(item)} className='mobile-inventory-card__trashcan-button'>  
                                <img className='mobile-inventory-card__trashcan' src={trashcan} alt='trashcan icon'/>
                            </button> */}
                        </div>
                        <div className='mobile-inventory-card__status-details'>
                            <h4 className='mobile-inventory-card__status-header'>STATUS</h4>
                            <p className='mobile-inventory-card__status'>
                                <span className={item.quantity ? 'mobile-inventory-card__status-tag--instock' : 'mobile-inventory-card__status-tag--outofstock'}>{item.status}</span>
                            </p>
                            <h4 className='mobile-inventory-card__quantity-header'>QTY</h4>
                            <p className='mobile-inventory-card__quantity'>{item.quantity}</p>
                            <h4 className='mobile-inventory-card__warehouse-header'>WAREHOUSE</h4>
                            <p className='mobile-inventory-card__warehouse'>{item.warehouseName}</p>
                            {/* <Link to={`/inventory/edit/${item.id}`}> 
                                <button className='mobile-inventory-card__edit-button'>  
                                    <img className='mobile-inventory-card__edit' src={edit} alt='edit icon'/>
                                </button>
                            </Link> */}
                        </div>
                    </div>
                    <div className='mobile-inventory-card__delete-edit-container'>
                        <div className='mobile-inventory-card__trashcan-container'>
                            <button onClick={() => openDeleteModal(item)} className='mobile-inventory-card__trashcan-button'>  
                                <img className='mobile-inventory-card__trashcan' src={trashcan} alt='trashcan icon'/>
                            </button>
                        </div>
                        <div className='mobile-inventory-card__edit-container'>
                            <Link to={`/inventory/edit/${item.id}`}> 
                                <button className='mobile-inventory-card__edit-button'>  
                                    <img className='mobile-inventory-card__edit' src={edit} alt='edit icon'/>
                                </button>
                            </Link>
                        </div>
                    </div>
            </article>
           ))}
           {!filteredInventory.length && <div className='mobile-inventory-card__not-found-container'>
                <h2 className='mobile-inventory-card__not-found'>No Item Found.</h2>
            </div>}
           {deleteModal && <DeleteInventoryModal closeDeleteModal={closeDeleteModal} handleDelete={handleDelete} item={item} />} 
        </>
    )
}

export default MobileInventoryCard;