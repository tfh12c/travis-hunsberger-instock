import './MobileWarehouseInventoryCard.scss'
import trashcan from '../../assets/icons/delete_outline.svg';
import edit from '../../assets/icons/edit.svg';
import chevron from '../../assets/icons/chevron_right.svg';

function MobileWarehouseInventoryCard({ inventoryData }) { 

    return (
        <>
           {inventoryData.map((inventory) => (
            <article key={inventory.id} className='mobile-warehouse-inventory-card'>
                <div className='mobile-warehouse-inventory-card__details-container'>  
                        <div className='mobile-warehouse-inventory-card__item-details'>
                            <h4 className='mobile-warehouse-inventory-card__inventory-header'>INVENTORY ITEM</h4>
                            {/* <Link to={`/warehouse/${warehouse.id}`} className='mobile-warehouse-inventory-card__warehouse-link'>  */}
                                <button className='mobile-warehouse-inventory-card__name-icon-button'>   
                                    <p className='mobile-warehouse-inventory-card__inventory-name'>{inventory.itemName}</p>
                                    <img className='mobile-warehouse-inventory-card__inventory-name-chevron' src={chevron} alt='chevron icon'/>
                                </button>
                            {/* </Link> */}
                            <h4 className='mobile-warehouse-inventory-card__category-header'>CATEGORY</h4>
                            <p className='mobile-warehouse-inventory-card__category'>{inventory.category}</p>
                            <button className='mobile-warehouse-inventory-card__trashcan-button'>  
                                <img className='mobile-warehouse-inventory-card__trashcan' src={trashcan} alt='trashcan icon'/>
                            </button>
                        </div>
                        <div className='mobile-warehouse-inventory-card__status-details'>
                            <h4 className='mobile-warehouse-inventory-card__status-header'>STATUS</h4>
                            <p className='mobile-warehouse-inventory-card__status'>
                                <span className={inventory.quantity ? 'mobile-warehouse-inventory-card__status-tag--instock' : 'mobile-warehouse-inventory-card__status-tag--outofstock'}>{inventory.status}</span>
                            </p>
                            <h4 className='mobile-warehouse-inventory-card__quantity-header'>QTY</h4>
                            <p className='mobile-warehouse-inventory-card__quantity'>{inventory.quantity}</p>
                            <button className='mobile-warehouse-inventory-card__edit-button'>  
                                <img className='mobile-warehouse-inventory-card__edit' src={edit} alt='edit icon'/>
                            </button>
                        </div>
                    </div>
            </article>
           ))} 
        </>
    )
}

export default MobileWarehouseInventoryCard;