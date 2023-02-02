import './MobileWarehouseCard.scss';
import trashcan from '../../assets/icons/delete_outline.svg';
import edit from '../../assets/icons/edit.svg';
import chevron from '../../assets/icons/chevron_right.svg';
import { useEffect, useState } from 'react';
import DeleteWarehouseModal from '../DeleteWarehouseModal/DeleteWarehouseModal';

function MobileWarehouseCard({ warehouses, handleDelete }) {
    const [warehouse, setWarehouse] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleModal = (event, warehouse) => {
        event.preventDefault();
        setWarehouse(warehouse);
        setDeleteModal(true)
    }

    //When deleteModal is opened, .body overflow will be hidden to prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = deleteModal ? "hidden" : "unset"
    }, [deleteModal])

    return (
        <>
            {deleteModal && <DeleteWarehouseModal handleModal={handleModal} handleDelete={handleDelete} warehouse={warehouse}/>}
            {warehouses.map((warehouse) => (
                <article key={warehouse.id} className='mobile-warehouse-card'>
                    <div className='mobile-warehouse-card__details-container'>  
                        <div className='mobile-warehouse-card__warehouse-details'>
                            <h4 className='mobile-warehouse-card__warehouse-header'>WAREHOUSE</h4>
                            <div className='mobile-warehouse-card__name-icon-container'>   
                                <p className='mobile-warehouse-card__warehouse-name'>{warehouse.name}</p>
                                <img className='mobile-warehouse-card__warehouse-name-chevron' src={chevron} alt='chevron icon'/>
                            </div>
                            <h4 className='mobile-warehouse-card__address-header'>ADDRESS</h4>
                            <p className='mobile-warehouse-card__address-street'>{warehouse.address},</p>
                            <p className='mobile-warehouse-card__address-city-country'>{warehouse.city}, {warehouse.country}</p>
                        </div>
                        <div className='mobile-warehouse-card__contact-details'>
                            <h4 className='mobile-warehouse-card__contact-header'>CONTACT NAME</h4>
                            <p className='mobile-warehouse-card__contact-name'>{warehouse.contact.name}</p>
                            <h4 className='mobile-warehouse-card__contact-info-header'>CONTACT INFORMATION</h4>
                            <p className='mobile-warehouse-card__contact-number'>{warehouse.contact.phone}</p>
                            <p className='mobile-warehouse-card__contact-email'>{warehouse.contact.email}</p>
                        </div>
                    </div>
                    <div className='mobile-warehouse-card__icons-container'>
                        <button onClick={(event) => handleModal(event, warehouse)} className='mobile-warehouse-card__trashcan-button'>  
                            <img className='mobile-warehouse-card__trashcan' src={trashcan} alt='trashcan icon'/>
                        </button>
                        <button className='mobile-warehouse-card__edit-button'>  
                            <img className='mobile-warehouse-card__edit' src={edit} alt='edit icon'/>
                        </button>
                    </div>
                </article>
            ))}
        </>
    )
}

export default MobileWarehouseCard;