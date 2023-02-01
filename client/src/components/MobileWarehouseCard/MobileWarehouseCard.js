import './MobileWarehouseCard.scss';
import trashcan from '../../assets/icons/delete_outline.svg';
import edit from '../../assets/icons/edit.svg';
import chevron from '../../assets/icons/chevron_right.svg';

function MobileWarehouseCard({ warehouses }) {

    return (
        <>
            {warehouses.map((warehouse) => (
                <article key={warehouse.id} className='mobile-warehouse-card'>
                    <div className='mobile-warehouse-card__warehouse-details-container'>
                        <h3 className='mobile-warehouse-card__warehouse-header'>WAREHOUSE</h3>
                        <div className='mobile-warehouse-card__name-icon-container'>   
                            <p className='mobile-warehouse-card__warehouse-name'>{warehouse.name}</p>
                            <img className='mobile-warehouse-card__warehouse-name-chevron' src={chevron} alt='chevron icon'/>
                        </div>
                        <h3 className='mobile-warehouse-card__address-header'>ADDRESS</h3>
                        <p className='mobile-warehouse-card__address-street'>{warehouse.address},</p>
                        <p className='mobile-warehouse-card__address-city-country'>{warehouse.city}, {warehouse.country}</p>
                    </div>
                    <div className='mobile-warehouse-card__contact-details-container'>
                        <h3 className='mobile-warehouse-card__contact-header'>CONTACT NAME</h3>
                        <p className='mobile-warehouse-card__contact-name'>{warehouse.contact.name}</p>
                        <h3 className='mobile-warehouse-card__contact-info-header'>CONTACT INFORMATION</h3>
                        <p className='mobile-warehouse-card__contact-number'>{warehouse.contact.phone}</p>
                        <p className='mobile-warehouse-card__contact-email'>{warehouse.contact.email}</p>
                    </div>
                    <div className='mobile-warehouse-card__icons-container'>
                        <button className='mobile-warehouse-card__trashcan-button'>  
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